import { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { storeUsers } from '../reducers/usersReducer'

import usersService from '../services/users'

const Users = () => {

	const users = useSelector(({ users }) => users)
	const dispatch = useDispatch()

	useEffect(() => {
		usersService.getAll().then(user_data => {
			dispatch(storeUsers(user_data))
		})
	}, [])

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>

				<tbody>
					{users.map(user => 
						<tr key={user.id}>
							<td> {user.username} </td>
							<td> {user.blogs.length} </td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Users