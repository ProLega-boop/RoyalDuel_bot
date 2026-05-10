import React from 'react';
import { motion } from 'framer-motion';

interface Player {
  id: string;
  username: string;
  avatar: string;
  bet: number;
  color: string;
}

interface GameWheelProps {
  players: Player[];
  isSpinning: boolean;
  rotation: number;
}

const GameWheel: React.FC<GameWheelProps> = ({ players, isSpinning, rotation }) => {
  const totalBet = players.reduce((sum, p) => sum + p.bet, 0);
  let currentAngle = 0;

  return (
    <div className="relative w-[300px] h-[300px] mx-auto">
      {/* Pointer */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[32px] border-b-yellow-400 drop-shadow-xl"></div>
      </div>

      <motion.div
        className="w-full h-full rounded-full relative overflow-hidden border-[14px] border-[#1a1a1a] shadow-[0_0_60px_rgba(234,179,8,0.5)]"
        animate={{ rotate: rotation }}
        transition={{ duration: isSpinning ? 5 : 0.3, ease: "easeOut" }}
      >
        {players.map((player, index) => {
          const percentage = (player.bet / totalBet) * 360;
          const startAngle = currentAngle;
          currentAngle += percentage;

          return (
            <div
              key={player.id}
              className="absolute inset-0"
              style={{
                background: `conic-gradient(from ${startAngle}deg, ${player.color} ${percentage}deg, transparent 0deg)`,
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
              }}
            >
              {/* Avatar in sector */}
              <div
                className="absolute text-center"
                style={{
                  left: '50%',
                  top: '28%',
                  transform: `rotate(${startAngle + percentage / 2}deg) translateX(105px) rotate(-${startAngle + percentage / 2}deg)`,
                }}
              >
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-11 h-11 rounded-full border-4 border-white shadow-xl mx-auto"
                />
                <div className="text-[10px] font-bold mt-1 text-white drop-shadow-md">{player.username}</div>
              </div>
            </div>
          );
        })}

        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-black rounded-full border-8 border-[#1a1a1a] flex items-center justify-center z-10 shadow-inner">
          <div id="timer" className="text-3xl font-mono font-bold text-yellow-400">00:20</div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameWheel;
