const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1) return "";

    const GenreIds = selectedGenres.map((g) => 'format=' + g.url);

    console.log(GenreIds.reduce((acc, curr) => acc + "&" + curr))
    return GenreIds.reduce((acc, curr) => acc + "%2C" + curr);
}

export default useGenre;