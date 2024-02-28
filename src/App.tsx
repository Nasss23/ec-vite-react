type Props = {
	children: string | JSX.Element | JSX.Element[];
};
function App({ children }: Props) {
	return <>{children}</>;
}

export default App;
