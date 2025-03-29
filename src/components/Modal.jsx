// components/EditUserModal.jsx
export default function Modal({ formData, setFormData, onClose, onUpdate }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Edit User</h2>
  
          <input
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
            placeholder="First Name"
          />
          <input
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
            placeholder="Last Name"
          />
          <input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
            placeholder="Email"
          />
  
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              onClick={onUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
  