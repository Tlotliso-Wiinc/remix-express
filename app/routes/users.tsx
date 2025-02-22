import { Plus, MoreVertical, Search } from 'lucide-react';

const UsersOverview = () => {
  const users = [
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 hours ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      role: 'Editor',
      status: 'Active',
      lastActive: '1 day ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      email: 'emma.t@example.com',
      role: 'Viewer',
      status: 'Inactive',
      lastActive: '5 days ago',
      avatar: '/api/placeholder/40/40'
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin Users</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage your team members and their access levels</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm flex items-center gap-2 shadow-sm">
            <Plus size={15} />
            <span className="text-sm">Add User</span>
          </button>
        </div>

        {/* Search and filters */}
        <div className="bg-white p-4 rounded-sm shadow-sm mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative text-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option>All roles</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
            <select className="border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option>All status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersOverview;