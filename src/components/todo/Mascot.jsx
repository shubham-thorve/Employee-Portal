import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import mascot from "../../images/mascot.png";
import "./Mascot.css";

const Mascot = () => {
const [showMascot, setShowMascot] = useState(false);
const [showBubble, setShowBubble] = useState(false);

const mascotAnimation = useSpring({
transform: showMascot ? 'translateX(40%)' : 'translateX(0%)',
config: { duration: 1500 },
delay:5000,
onRest: () => {
if (!showMascot) setShowMascot(false);
},
});

const bubbleAnimation = useSpring({
opacity: showBubble ? 1 : 0,
transform: showBubble ? 'scale(1)' : 'scale(0)',
config: { duration: 500 },
delay:1000
});

useEffect(() => {
const timeout1 = setTimeout(() => {
setShowMascot(true);
setShowBubble(true);
}, 0); // Show mascot and bubble immediately

const timeout2 = setTimeout(() => {
setShowBubble(false); // Hide bubble after 5 seconds
}, 4000);

const timeout3 = setTimeout(() => {
setShowMascot(false); // Hide mascot after 6 seconds
}, 6000);

return () => {
clearTimeout(timeout1);
clearTimeout(timeout2);
clearTimeout(timeout3);
};
}, []);

return (
<div className="mascot-container">
<animated.div className="mascot-img" style={{...mascotAnimation }}>
{showMascot && <img src={mascot} alt="Mascot" />}
</animated.div>
{showBubble && (
<animated.div className="bubble" style={{...bubbleAnimation}}>
Hi, welcome to the todolist page!
</animated.div>
)}
</div>
);
};

export default Mascot;