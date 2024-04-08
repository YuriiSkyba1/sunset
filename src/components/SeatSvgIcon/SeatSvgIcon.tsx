interface ISeatSvgIcon {
	color?: "yellow" | "#FFF3F9";
	width?: "20" | "16"
}

function SeatSvgIcon( {color = 'yellow', width = '20'} : ISeatSvgIcon) {
  return (
	<svg width={`${width}`} height={`${width}`} viewBox={`0 0 ${width} ${width}`} fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M13.9836 6.01666C16.1835 8.2166 16.1835 11.7834 13.9836 13.9833C11.7837 16.1833 8.21686 16.1833 6.01692 13.9833C3.81698 11.7834 3.81698 8.2166 6.01692 6.01666L10.0003 2.03332L13.9836 6.01666Z" fill={`${color}`} stroke="#222222" stroke-width="0.751106"/>
	</svg>
  )
}

export default SeatSvgIcon;