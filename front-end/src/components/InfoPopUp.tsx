import React from 'react';

interface InfoPopupProps {
	x: number;
	y: number;
	text: string;
}

const InfoPopUp: React.FC<InfoPopupProps> = ({ x, y, text }) => {
	//*change position of the element based on the position of the mouse
	const style: React.CSSProperties = {
		position: 'fixed',
		top: `${y}px`,
		left: `${x+10}px`,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		color: 'white',
		padding: '8px',
		borderRadius: '4px',
	};

	return (
	<div style={style}>
		{text}
	</div>
	);
};

export default InfoPopUp;
