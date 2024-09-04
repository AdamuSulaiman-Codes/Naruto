const Card = ({ onSelect, character}) => {
    return (
        <div className="card" onClick={() => onSelect(character)}>
            <img src={character.image} alt={character.name} className="card-image" />
            <p className="card-name">{character.name}</p>
            <p>{character.role}</p>
        </div>
    );
}

export default Card;
