import React, { useState } from 'react';
import { MoreVertical, Search, Plus } from 'lucide-react';
import { json } from "@remix-run/node";

import { Link, useLoaderData } from '@remix-run/react';
import { getMembers } from '../data';

export const loader = async () => {
  const members = await getMembers();
  return json({ members });
};

const MembersDashboard = () => {
  const { members } = useLoaderData<{ members: any[] }>();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter members based on search query and department
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.firstname + ' ' + member.lastname).toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold">Members</h1>
            <Link to="/member">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm flex items-center gap-2 shadow-sm">
                  <Plus size={15} />
                  <span className="text-sm">Add Member</span>
              </button>
            </Link>
        </div>

        {/* Search and filters */}
        <div className="bg-white p-4 rounded-sm shadow-sm mb-6">
            <div className="flex gap-4">
            <div className="flex-1 relative text-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <select className="border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option>All roles</option>
                <option>Admin</option>
                <option>Viewer</option>
            </select>
            <select className="border border-gray-300 rounded-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option>All status</option>
                <option>Active</option>
                <option>Inactive</option>
            </select>
            </div>
        </div>

        <div className="rounded-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Phone</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Role</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="relative px-4 py-2">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                <tr 
                    key={member.id} 
                    className="bg-white hover:bg-gray-50 transition-colors"
                >
                    <td className="px-4 py-2 font-medium">{member.firstname + ' ' + member.lastname}</td>
                    <td className="px-4 py-2">{member.phone}</td>
                    <td className="px-4 py-2">{member.email}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.active === true ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.active === true ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
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
  );
};

export default MembersDashboard;