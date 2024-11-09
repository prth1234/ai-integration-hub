import { motion } from "framer-motion";

const BackgroundLines = () => {
  const generateRandomPath = () => {
    const startX = Math.random() * 500;
    const startY = Math.random() * 200;
    const controlX1 = Math.random() * 500;
    const controlY1 = Math.random() * 200;
    const controlX2 = Math.random() * 500;
    const controlY2 = Math.random() * 200;
    const endX = Math.random() * 500;
    const endY = Math.random() * 200;
    return `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
  };

  const paths = Array.from({ length: 10 }, generateRandomPath);

  const colors = ["#46A5CA", "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9"];

  const pathVariants = {
    initial: { strokeDashoffset: 800, strokeDasharray: "50 800" },
    animate: {
      strokeDashoffset: 0,
      strokeDasharray: "20 800",
      opacity: [0, 1, 1, 0],
    },
  };

  return (
    <motion.div className="absolute inset-0 w-full h-full overflow-hidden">
      <motion.svg
        viewBox="0 0 500 200"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke={colors[index % colors.length]}
            strokeWidth="2"
            fill="none"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 2,
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

export default BackgroundLines;
