import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import delivery from "assets/delivery.gif";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useMutation } from "hooks/useMutation";
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from "app/hooks"
import { logIn } from "app/features/user/userSlice";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const [select, setSelect] = useState('');
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const role: any = {
        Admin: "/admin/login",
        Manager: "/manager/login",
        Driver: "/driver/login",
        DeliveryManager: "/deliverymanager/login",
    }
    const { mutate: SignIn }: any = useMutation(role[select], {
        onSuccess: (res: any) => {
            if (res.data.error) {

                toast.dismiss();
                toast.error('incorrect credentials')
            } else {
                toast.dismiss();
                toast.success('succes...')
                dispatch(logIn(res.data?.payload))
                navigate("../about", { replace: true });
            }
        },
        onError: (err: any) => {
            console.log(err);
            toast.dismiss();
            toast.error('something went rong...')
        },
        onMutate: () => {
            toast.loading('loading...')
        }
    });

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        Select: yup
            .string()
            .required('role is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            Select: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSelect(values.Select);
            SignIn({
                email: values.email,
                password: values.password
            });


        },
    });
    return (
        <div className="w-screen h-screen flex  justify-center items-center bg-gray-50 ">
            < Toaster />
            <div className="w-[40%] xl:w-[40%] lg:w-[60%] md:w-[60%] sm:w-full xs:w-full ">
                <Box
                    sx={{
                        padding: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt="MarocShip" src={delivery} sx={{ width: 150, height: 150 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        <div className="text-lg xl:text-3xl  lg:text-3xl md:text-2xl sm:text-lg xs:text-sm">
                            {formik.values.Select === '' ? 'Sign In' : 'Sign In as ' + formik.values.Select}
                        </div>
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth={true}
                            id="email"
                            label="Email Address"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField

                            margin="normal"
                            required
                            fullWidth={true}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}

                        />
                        <FormControl sx={{ minWidth: '100%' }} margin="normal">
                            <InputLabel id="Select">Role</InputLabel>
                            <Select
                                labelId="Select"
                                id="Select"
                                name="Select"
                                value={formik.values.Select}
                                label="Role *"
                                onChange={formik.handleChange}
                                error={formik.touched.Select && Boolean(formik.errors.Select)}

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Admin'}>Admin</MenuItem>
                                <MenuItem value={'Manager'}>Manager</MenuItem>
                                <MenuItem value={'Driver'}>Driver</MenuItem>
                                <MenuItem value={'DeliveryManager'}>Delivery Manager</MenuItem>
                            </Select>
                            {
                                (!!(formik.errors.Select)) && <FormHelperText component="fieldset" sx={{ color: 'red' }}>{formik.errors.Select}</FormHelperText>
                            }
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box >
            </div >
        </div >

    );
}
