import StatusWrapper from './StatusWrapper';
import './styles.css'

export default function UserRow({ user, selectedUsers, onChange }) {
    return(
        <tr>
            <td className="col-sm-1"><CheckBox user={user} selectedUsers={selectedUsers} onChange={onChange}/></td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.last_login}</td>
            <td>{user.registerDate}</td>
            <td><StatusWrapper status={user.status} accentColor={user.status === 'blocked' ? 'red' : 'darkorange'}/></td>
        </tr>
    );
}

export function CheckBox({ user, selectedUsers, onChange }) {
    return(
        <input 
            type="checkbox"
            className='form-check-input users-checkbox'
            checked={selectedUsers?.includes(user.email)}
            onChange={(e) => onChange(e, user.email)}
        />
    );
}