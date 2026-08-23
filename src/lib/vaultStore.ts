import { VaultDocument } from '@/types';
import { INITIAL_VAULT_DOCUMENTS } from '@/data/vaultDocuments';

// In-memory runtime store for server lifecycle
let runtimeDocuments: VaultDocument[] = [...INITIAL_VAULT_DOCUMENTS];

export function listVaultDocuments(category?: string | null, search?: string | null): VaultDocument[] {
  let filtered = [...runtimeDocuments];

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

export function getVaultDocumentById(id: string): VaultDocument | undefined {
  return runtimeDocuments.find((d) => d.id === id);
}

export function addVaultDocument(doc: VaultDocument): VaultDocument {
  // Prepend new document so it appears first in the vault
  runtimeDocuments = [doc, ...runtimeDocuments];
  return doc;
}

export function deleteVaultDocument(id: string): boolean {
  const initialLength = runtimeDocuments.length;
  runtimeDocuments = runtimeDocuments.filter((d) => d.id !== id);
  return runtimeDocuments.length < initialLength;
}
