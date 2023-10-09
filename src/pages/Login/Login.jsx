import { Button, Card, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { Navigate, useNavigate } from 'react-router-dom';
import CommunityImage from '../../assets/community_banner.jpeg';
import { login } from '../../api/login';
import { toast } from 'sonner';
import { useState } from 'react';
import { getResultFromData } from '../../helper';

const Login = () => {
	const isLoggedIn = localStorage.getItem('isLoggedIn');
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [invalid, setInvalid] = useState(false);
	const [valid, setValid] = useState(false);

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}

	const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const handleLogin = async () => {
		const isValidEmail = validateEmail(email);
		if (isValidEmail) {
			setInvalid(false);
			const loginDataResponse = await login({ email });
			const result = getResultFromData(loginDataResponse);
			if (result) {
				localStorage.setItem('isLoggedIn', 'true');
				setValid(true);
				toast.success('Login Successful');
				navigate('/myeo');
			} else {
				toast.error('Login Failed');
			}
		} else {
			setInvalid(!isValidEmail);
		}
	};

	const handleEmailChange = (e) => {
		setValid(false);
		setInvalid(false);
		setEmail(e.target.value);
	};

	return (
		<div className="w-full flex justify-center">
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
							isInvalid={invalid}
							errorMessage={invalid && 'We can’t find any registration linked to email'}
							color={(invalid && 'danger') || (valid && 'success')}
							isRequired
							onChange={handleEmailChange}
						/>
					</div>
					<div className="flex ">
						<Button onClick={handleLogin} radius="full">
							Login
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
