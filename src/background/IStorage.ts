export interface IStorage {
    loadNotes(): Promise<any>;
    saveNote(id: number, description: string): Promise<any>;
}
