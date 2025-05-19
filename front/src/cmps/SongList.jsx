import { SongPreview } from './SongPreview'

export function SongList({ songs, onSelectSong, isSelectable }) {
    return (
        <section>
            <ul className="list song-list">
                {songs.map(song =>
                    <li 
                        key={song._id} 
                        className={isSelectable ? 'selectable' : ''}
                    >
                        <SongPreview song={song} isSelectable={isSelectable} onSelectSong={onSelectSong} />
                    </li>
                )}
            </ul>
        </section>
    )
} 