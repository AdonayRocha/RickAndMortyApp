export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharacterResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

export async function getCharacters(
    page: number = 1
): Promise<CharacterResponse | null> {
    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}`
        );
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data as CharacterResponse;
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        return null;
    }
}
