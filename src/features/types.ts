export interface MovieOMDB {
    poster_path: string;
    id: number;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface User {
    username: string;
    bio?: string;
    reviews?: Review[];
    watched_movies?: MovieInstance[];
    followers?: MovieInstance[];
    following?: MovieInstance[];
    watch_list?: MovieInstance[];
    favorites?: MovieInstance[];
    lists?: MovieList[];
}

export interface userLogInInput {
    username: string;
    password: string;
}

export interface Review {
    movie: MovieInstance;
    content: string;
    user: User;
    likes?: number;
    rating?: number;
}

export interface MovieInstance {
    title: string;
    year: string;
    synopsis: string;
    poster: string;
    reviews?: Review[];
    likes?: number;
    genres?: string[];
}

export interface MovieList {
    title: string;
    description: string;
    movies: MovieInstance[];
    user: User;
}
