const NumberInput = () => {
	return (
		<>
			<span className="input-number-decrement">–</span>
			<input className="input-number" type="text" value="1" min="0" max="10" />
			<span className="input-number-increment">+</span>
		</>
	);
};

export default NumberInput;
