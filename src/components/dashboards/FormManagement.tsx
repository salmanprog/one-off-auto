import React, { useState } from 'react';
import { useOptions } from '../../context/OptionsContext';

const FIELDS = [
  //{ key: 'vehicle_category_id', label: 'Vehicle Type' },
  { key: 'vehicle_make', label: 'Make' },
  { key: 'vehicle_model', label: 'Model', parent: 'vehicle_make' },
  { key: 'vehicle_year', label: 'Year' },
  //{ key: 'exterior_color', label: 'Exterior Color' },
  //{ key: 'interior_color', label: 'Interior Color' },
  { key: 'suspension_type', label: 'Suspension Type' },
  { key: 'driver_type', label: 'Driver Type' },
  { key: 'motor_size_cylinders', label: 'Motor Size (Cylinders)' },
  { key: 'transmition_types', label: 'Transmission Type' },
  { key: 'fuel_types', label: 'Fuel Type' },
  { key: 'seller_type', label: 'Seller Type' },
  { key: 'vehicle_status', label: 'Vehicle Status' },
  { key: 'hp_output_rang', label: 'HP Output Range' },
  { key: 'vehicle_use', label: 'Vehicle Use' },
  { key: 'documentation_type', label: 'Documentation Type' },
];

let nextId = 1000;

const FormManagement: React.FC = () => {
  const { options, addOption, editOption, deleteOption } = useOptions();
  const [selectedField, setSelectedField] = useState(FIELDS[0].key);
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null); // For model dependency
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newModelMakeId, setNewModelMakeId] = useState<number | null>(null);

  // Get options for the selected field
  let fieldOptions = options[selectedField] || [];
  if (selectedField === 'vehicle_model' && selectedMakeId) {
    fieldOptions = fieldOptions.filter((opt: any) => opt.makeId === selectedMakeId);
  }

  // Handlers
  const handleAdd = () => {
    if (!newValue.trim()) return;
    if (selectedField === 'vehicle_model') {
      if (!newModelMakeId) return;
      addOption('vehicle_model', newValue, newModelMakeId);
    } else {
      addOption(selectedField, newValue);
    }
    setNewValue('');
    setNewModelMakeId(null);
  };

  const handleEdit = (id: number, value: string) => {
    setEditId(id);
    setEditValue(value);
  };

  const handleEditSave = () => {
    editOption(selectedField, editId!, editValue);
    setEditId(null);
    setEditValue('');
  };

  const handleDelete = (id: number) => {
    deleteOption(selectedField, id);
  };

  // For model field, show make selector
  const renderModelMakeSelector = () => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Select Make</label>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={selectedMakeId || ''}
        onChange={e => setSelectedMakeId(Number(e.target.value))}
      >
        <option value="">-- Select Make --</option>
        {options.vehicle_make.map((make: any) => (
          <option key={make.id} value={make.id}>{make.value}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex min-h-[600px]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r">
        <h3 className="text-lg font-bold mb-4">Fields</h3>
        <ul>
          {FIELDS.map(field => (
            <li key={field.key}>
              <button
                className={`w-full text-left px-2 py-1 rounded mb-1 ${selectedField === field.key ? 'bg-blue-200 font-semibold' : 'hover:bg-gray-200'}`}
                onClick={() => {
                  setSelectedField(field.key);
                  setSelectedMakeId(null);
                  setEditId(null);
                }}
              >
                {field.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Area */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Manage {FIELDS.find(f => f.key === selectedField)?.label} Options</h2>
        {selectedField === 'vehicle_model' && renderModelMakeSelector()}
        {/* Option List */}
        <div className="mb-6">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 border">Value</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fieldOptions.map((opt: any) => (
                <tr key={opt.id}>
                  <td className="p-2 border">
                    {editId === opt.id ? (
                      <input
                        className="p-1 border rounded"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                      />
                    ) : (
                      <span>
                        {/* Show color swatch for color fields */}
                        {(selectedField === 'exterior_color' || selectedField === 'interior_color') && (
                          <span style={{
                            display: 'inline-block',
                            width: 20,
                            height: 20,
                            backgroundColor: opt.value,
                            border: '1px solid #ccc',
                            marginRight: 8,
                            verticalAlign: 'middle',
                          }} />
                        )}
                        {opt.title}
                      </span>
                    )}
                  </td>
                  <td className="p-2 border">
                    {editId === opt.id ? (
                      <>
                        <button className="mr-2 text-green-600" onClick={handleEditSave}>Save</button>
                        <button className="text-gray-500" onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="mr-2 text-blue-600" onClick={() => handleEdit(opt.id, opt.value)}>Edit</button>
                        <button className="text-red-600" onClick={() => handleDelete(opt.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {fieldOptions.length === 0 && (
                <tr>
                  <td className="p-2 border text-gray-400" colSpan={2}>No options found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Add Option */}
        <div className="flex gap-2 items-end">
          {selectedField === 'vehicle_model' && (
            <div>
              <label className="block text-xs mb-1">Make</label>
              <select
                className="p-1 border rounded"
                value={newModelMakeId || ''}
                onChange={e => setNewModelMakeId(Number(e.target.value))}
              >
                <option value="">-- Select Make --</option>
                {options.vehicle_make.map((make: any) => (
                  <option key={make.id} value={make.id}>{make.value}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex-1">
            <label className="block text-xs mb-1">New Option</label>
            <input
              className="w-full p-1 border rounded"
              value={newValue}
              onChange={e => setNewValue(e.target.value)}
              placeholder="Enter new option value"
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAdd}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormManagement; 