import { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Routes, Link, useMatch, useNavigate } from 'react-router-dom'

import { TableBody, TableContainer, TableRow, Paper, Table, TableCell, TableHead } from "@mui/material"

import { storeUsers } from '../reducers/usersReducer'

import usersService from '../services/users'

const InformationTable = ({ users }) => {

	const navigate = useNavigate()

	return(
		
		<div>
			<TableContainer component={Paper} >
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								USER
							</TableCell>
							<TableCell>
								BLOGS
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
								<TableCell>
									{user.username}
								</TableCell>
								<TableCell>
									{user.blogs.length}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>		
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