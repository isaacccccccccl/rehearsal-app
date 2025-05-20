export function SongPreview({ song, isSelectable, onSelectSong }) {
    const isHeb = song.language === 'he';
    function handleClick() {
        if (isSelectable && onSelectSong) {
            onSelectSong(song._id);
        }
    }
    return (
        <article 
            className={`preview song-preview${isHeb ? ' hebrew' : ''}${isSelectable ? ' selectable' : ''}`} 
            onClick={handleClick}
        >
            <header>
                <span className="song-title">{song.title}</span>
            </header>
            <p>{isHeb ? 'יוצר' : 'Author'}: <span>{song.artist}</span></p>
            {song.year && <p>{isHeb ? 'שנה' : 'Year'}: <span>{song.year}</span></p>}
        </article>
    )
} 