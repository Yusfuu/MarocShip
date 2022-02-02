import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FC } from "react";

type IAppProps = {
  children: any;
  onClose: () => void;
};

export const Modal: FC<IAppProps> = ({ children, onClose }: any) => {
  return (
    <Dialog initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} as={motion.div} className="fixed inset-0 z-10 overflow-y-auto" open onClose={onClose}>
      <div className="min-h-screen px-4 text-center bg-slate-800/20">
        <Dialog.Overlay className="fixed inset-0" as={motion.div} />
        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
        <div className="inline-block w-full max-w-md p-6  my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {children}
        </div>
      </div>
    </Dialog>
  );
}