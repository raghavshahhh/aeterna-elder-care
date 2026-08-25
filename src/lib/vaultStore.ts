import { put, del, get } from '@vercel/blob';
import { VaultDocument } from '@/types';
import { INITIAL_VAULT_DOCUMENTS } from '@/data/vaultDocuments';

const INDEX_BLOB_PATH = 'vault-index/documents.json';

// Seed documents (committed to the repo, either mock cards or real filePath assets)
async function readUploadedDocuments(): Promise<VaultDocument[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const result = await Promise.race([
      get(INDEX_BLOB_PATH, { access: 'private', useCache: false }),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('timeout')), 1500))
    ]);
    if (!result) return [];
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as VaultDocument[];
  } catch {
    // Index does not exist yet or offline fallback
    return [];
  }
}

async function writeUploadedDocuments(docs: VaultDocument[]): Promise<void> {
  await put(INDEX_BLOB_PATH, JSON.stringify(docs), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true
  });
}

export async function listVaultDocuments(category?: string | null, search?: string | null): Promise<VaultDocument[]> {
  const uploaded = await readUploadedDocuments();
  let filtered = [...uploaded, ...INITIAL_VAULT_DOCUMENTS];

  if (category && category !== 'all') {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(s) ||
        d.description.toLowerCase().includes(s) ||
        d.fileName.toLowerCase().includes(s) ||
        d.categoryLabel.toLowerCase().includes(s)
    );
  }

  return filtered;
}

export async function getVaultDocumentById(id: string): Promise<VaultDocument | undefined> {
  const seed = INITIAL_VAULT_DOCUMENTS.find((d) => d.id === id);
  if (seed) return seed;

  const uploaded = await readUploadedDocuments();
  return uploaded.find((d) => d.id === id);
}

/** Uploads the file to persistent private Blob storage and appends it to the metadata index. */
export async function addVaultDocument(doc: VaultDocument, fileBuffer: Buffer, contentType: string): Promise<VaultDocument> {
  const blobPath = `vault-uploads/${doc.id}/${doc.fileName}`;
  const blob = await put(blobPath, fileBuffer, {
    access: 'private',
    contentType,
    allowOverwrite: true
  });

  const docWithBlob: VaultDocument = { ...doc, blobPath: blob.pathname };
  const uploaded = await readUploadedDocuments();
  await writeUploadedDocuments([docWithBlob, ...uploaded]);
  return docWithBlob;
}

export async function deleteVaultDocument(id: string): Promise<boolean> {
  const uploaded = await readUploadedDocuments();
  const target = uploaded.find((d) => d.id === id);
  if (!target) return false;

  if (target.blobPath) {
    try {
      await del(target.blobPath);
    } catch {
      // Blob already gone; still proceed to remove it from the index
    }
  }

  await writeUploadedDocuments(uploaded.filter((d) => d.id !== id));
  return true;
}

/** Fetches an uploaded document's raw bytes from private Blob storage. */
export async function readUploadedFile(blobPath: string): Promise<{ stream: ReadableStream; contentType: string | null } | null> {
  const result = await get(blobPath, { access: 'private', useCache: false });
  if (!result || !result.stream) return null;
  return { stream: result.stream, contentType: result.blob.contentType };
}
