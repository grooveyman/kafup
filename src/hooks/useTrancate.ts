

type TruncateOptions = {
    words?: number;
    characters?: number;
};

export const useTruncate = (text: string, { words, characters }: TruncateOptions) => {
    if (!text) return "";

    if (words) {
        const wordArray = text.trim().split(/\s+/);

        return wordArray.length > words ? `${wordArray.slice(0, words).join(" ")}...` : text;
    }

    if (characters) {
        return text.length > characters ? `${text.slice(0, characters)}...` : text;
    }

    return text;
};