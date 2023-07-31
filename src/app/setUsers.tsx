type User = {
  id: number;
  name: string;
  buy: number;
  pay: number;
};

type Users = {
  num: number;
  users: User[];
};

const Users = (users: Users) => {
  return (
    <div>
      <ul>
        {users.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
