import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="min-h-64 flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600" />
        </div>
    );
}
