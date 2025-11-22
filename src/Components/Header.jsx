// React icons
import { MdAdd } from "react-icons/md";

// MUI
import { Button } from "@mui/material";

// react imports
import { useContext } from "react";

// My Context
import { DialogToggleContext } from "../Context/MyContext";

const Header = () => {
  const { setOpen } = useContext(DialogToggleContext);
  return (
    <>
      <header className="w-full bg-[#26667F] py-4 lg:px-40 px-6 flex flex-wrap justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl text-[#67C090]">Expanse Tracker</h1>
          <p className="text-[#DDF4E7]">
            Track your income and expenses effortlessly
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={() => setOpen(true)}
        >
          Add Transaction
        </Button>
      </header>
    </>
  );
};

export default Header;
