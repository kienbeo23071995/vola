function AdminTopbar({ userName, avatar }) {
  return (
    <div className="bg-white flex items-center rounded-t-[20px] justify-between px-[10px] py-[12px]">
      <div className="flex items-center justify-end w-full">
        <span className="font-bold text-[14px] flex-shrink-0">{userName}</span>
        <img
          src={avatar}
          className="mr-[12px] rounded-full"
          alt=""
          width={30}
          height={30}
        />
      </div>
    </div>
  );
}

export default AdminTopbar;
