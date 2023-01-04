import React, { useState, useEffect } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { modalStyles } from "./styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// dùng để validation sử dụng react hook form và Yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultInputValues = {
  userId: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const NewUserModal = ({ open, onClose, addNewUser }) => {
  const [values, setValues] = useState(defaultInputValues);
  // tạo const showPassword và đặt cho nó giá trị boolean bằng false 
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

  // hàm để khi clich thì ẩn hiện pasword khi là show thì ấn thì ẩn đi password, khi password đang ẩn thì cho hiện ra 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const modalStyles = {
    inputFields: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      ".MuiFormControl-root": {
        marginBottom: "20px",
      },
    },
  };

  // validation bằng regex
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword =
    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$";

  //---------------------------------------------------------------------------------------------------

  // tạo hàm validationSchema nó dùng để chứa tất cả các validation rule (quy tắc xác thực )
  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      //required bắt buộc bên trong required là thông báo mà mình muốn gửi
      .required("User ID is required")
      // chứa tối thiểu 6 kí tự
      .min(6, "User ID must be at least 6 characters"),
    email: Yup.string().matches(regexEmail, "Email is not valid"),
    // .email đã được tích hợp trong Yup

    // .required('Email is required')
    // .email('Email is invalid.'),
    phoneNumber: Yup.string().matches(
      regexPhoneNumber,
      "Phone number is not valid"
    ),
    // password: Yup.string()
    //   .required("Please Enter your password")
    //   .matches(
    //     regexPassword,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    //   ),
    confirmPassword: Yup.string()
      .required("ConfirmPassword is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    //    password: Yup.string().required('Password is required'),
    // passwordConfirmation: Yup.string()
    //    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
//------------------------------------------------

// sử dụng react hook form dùng để hủy cấu trúc 
// register cho phép đăng ký và nhập dữ liệu 
// submit là chức năng nhận dữ liệu của biểu mẫu nếu xác nhận giá trị của biểu mẫu thành công 
// formState là đối tượng chứa thông tin về trạng thái 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addUser = (data) => {
    addNewUser(data);
  };

  const handleChange = (value) => {
    setValues(value);
  };

  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        placeholder="User ID"
        name="userId"
        label="User ID"
        required
        {...register("userId")}
        //để thông báo lỗi hiện viền đỏ
        error={errors.userId ? true : false}
        //hiện ra văn bản thông báo lỗi helperText
        helperText={errors.userId?.message}
        value={values.userId}
        onChange={(event) =>
          handleChange({ ...values, userId: event.target.value })
        }
      />
      <TextField
        placeholder="Email"
        name="email"
        label="Email"
        required
        {...register("email")}
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        value={values.email}
        onChange={(event) =>
          handleChange({ ...values, email: event.target.value })
        }
      />
      <TextField
        placeholder="Phone number"
        name="phoneNumber"
        label="Phone number"
        required
        {...register("phoneNumber")}
        error={errors.phoneNumber ? true : false}
        helperText={errors.phoneNumber?.message}
        value={values.phoneNumber}
        onChange={(event) =>
          handleChange({ ...values, phoneNumber: event.target.value })
        }
      />
      <FormControl sx={modalStyles.inputFields}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          // toán tử ba ngôi nếu điều kiện 1(trước dấu ?) là đúng thì toán tử sẽ trả về giá trị của điều kiện 1 còn nếu là sai thì nó trả về giá trị của value 2
          // type nếu mà showpassword nếu là định dang text thì trả về text không thì trả về dạng password 
          type={showPassword ? "text" : "password"}
          // visibility và VisibilityOff là biểu tượng icon 
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          required
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          value={values.password}
          onChange={(event) =>
            handleChange({ ...values, password: event.target.value })
          }
        />
      </FormControl>
      <FormControl sx={modalStyles.inputFields}>
        <InputLabel htmlFor="outlined-adornment-confirmPassword">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="confirmPassword"
          name="confirmPassword"
          required
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="ConfirmPassword"
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword?.message}
          value={values.confirmPassword}
          onChange={(event) =>
            handleChange({ ...values, confirmPassword: event.target.value })
          }
        />
      </FormControl>
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New user"
      subTitle="Fill out inputs and hit 'submit' button."
      content={getContent()}
      onSubmit={handleSubmit(addUser)}
    />
  );
};

export default NewUserModal;
