const UserCard: React.FC<{ name: string; age: number }> = ({ name, age }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{age}</p>
        </div>
    );
};

export default UserCard;
