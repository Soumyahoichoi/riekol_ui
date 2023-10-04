import { Button, Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { Navigate } from 'react-router-dom';
import CommunityImage from '../../assets/community_banner.jpeg';
import { login } from '../../api/login';
import { toast } from 'sonner';
import { useState } from 'react';

const Login = () => {
	const isLoggedIn = localStorage.getItem('isLoggedIn');
	const [email, setEmail] = useState('');

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	const handleLogin = async () => {
		const loginData = await login({ email });
		console.log(loginData);

		if (loginData) {
			localStorage.setItem('isLoggedIn', 'true');
			toast.success('Login Successful');
		} else {
			toast.error('Login Failed');
		}
	};

	return (
		<Card className="max-w-[400px]">
			<CardBody className="overflow-visible p-0">
				<Image
					className="object-cover"
					alt="logo"
					height={600}
					radius="sm"
					src={CommunityImage}
					width={600}
				/>
			</CardBody>

			<CardFooter className="flex-col">
				<div className="flex w-full flex-wrap md:flex-nowrap flex-col pt-3">
					<p className="text-2xl text-center">Welcome</p>
				</div>
				<div className="py-5">
					<p className="text-center text-sm pb-5">
						Please enter the email address you provided during event registration.
					</p>
					<Input
						type="email"
						label="Email"
						placeholder="Enter your email"
						isRequired
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex ">
					<Button onClick={handleLogin} radius="full">
						Login
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Login;
