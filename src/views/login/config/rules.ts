export const rules = {
    name: [
        {
            required: true,
            message: "用户名是必传内容~",
            trigger: "blur"
        },
        {
            pattern: /^[a-z0-9]{4,10}$/,
            message: "用户名必须是4~10个字母或数字",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "密码是必传内容~",
            trigger: "blur"
        },
        {
            pattern: /^[a-z0-9]{3,}$/,
            message: "密码必须大于3位呕~",
            trigger: "blur"
        }

    ],
    num: [
        {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
        },
        {
            pattern: /^[1-9]{11}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
        },
    ],
    code: [
        {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
        }
    ]
}