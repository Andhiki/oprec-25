import MakomtiRow from "./makomti-row";

const MakomtiTable = ({ allUsers, admin }: { allUsers: any; admin: any }) => {
  return (
    <table className="min-w-full overflow-x-auto">
      <thead>
        <tr className="bg-custom-gray *:px-6 *:py-3 *:text-start *:text-[0.9rem] *:font-semibold *:transition-all">
          <th className="hover:bg-custom-black/10">No</th>
          <th className="hover:bg-custom-black/10">Username</th>
          <th className="hover:bg-custom-black/10">Divisi Pilihan</th>
          <th className="hover:bg-custom-black/10">
            Tanggal Wawancara{" "}
            <span className="text-custom-lavender">HIMAKOM</span>
          </th>
          <th className="hover:bg-custom-black/10">
            Tanggal Wawancara <span className="text-custom-orange">OMAHTI</span>
          </th>
          <th className="hover:bg-custom-black/10">Diterima Di</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700 text-sm">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user: any, index: number) => 
            (
              <MakomtiRow key={user._id} user={user} index={index} />
            )
          )
        ) : (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
              Belum ada pendaftar.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MakomtiTable;
