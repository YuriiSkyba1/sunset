function Button({
	label,
	type = "button",
	style = "primary",
	onClick,
}: {
	label: string;
	style?: "primary";
	type?: "submit" | "button";
	onClick?: () => void;
}) {
	const buttonStyles = {
		primary: "w-[300px] py-3 desktop:px-12 text-center bg-primary text-[14px] font-bold",
	};

	console.log(buttonStyles[style]);

	return (
		<button className={buttonStyles[style]} onClick={onClick} type={type}>
			{label}
		</button>
	);
}

export default Button;
