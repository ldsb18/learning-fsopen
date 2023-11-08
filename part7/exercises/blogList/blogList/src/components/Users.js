import { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Routes, Link, useMatch } from 'react-router-dom'

import { storeUsers } from '../reducers/usersReducer'

import usersService from '../services/users'

const InformationTable = ({ users }) => {

	return(
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
						<td> <Link to={`/users/${user.id}`} >{user.username}</Link> </td>
						<td> {user.blogs.length} </td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

const UserInformation = ({ user }) => {

	if(!user) return null

	return (
		<div>
			<h2> {user.username} </h2>

			<ul>
					{user.blogs.map( blog => 
						<li key={blog.id}>
							<Link to={`/blogs/${blog.id}`} > { blog.title } </Link>
						</li>
					)}
			</ul>
		</div>
	)
}

const Users = () => {

	const users = useSelector(({ users }) => users)
	const dispatch = useDispatch()

	const match = useMatch('/users/:id')
	const user = match
		? users.find(u => u.id === match.params.id)
		: null

	useEffect(() => {
		usersService.getAll().then(user_data => {
			dispatch(storeUsers(user_data))
		})
	}, [])

	return (
			<Routes>
				<Route path='/' element={<InformationTable users={users} />} />
				<Route path='/:id' element={<UserInformation user={user} />} />
			</Routes>
	)
}

export default Users