import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, PhoneForwarded, PhoneOff, Bot } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const forwardNumbers = [
  '+1 (317) 967-8680',
  '+1 (415) 555-0123',
  '+1 (212) 555-0456',
  '+1 (305) 555-0789'
];

const simProviders = [
  'Airtel',
  'Jio',
  'Vodafone/Idea',
  'BSNL'
];

function UpdateProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    isForwardingActive: false,
    prompt: '',
    forwardTo: '',
    simProvider: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        isForwardingActive: user.forwarding_status || false,
        prompt: user.assistant_prompt || '',
        forwardTo: user.forwarded_to || '',
        simProvider: user.sim_provider || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.isForwardingActive && !formData.forwardTo) {
      toast.error('Please select a forward number when call forwarding is active');
      return;
    }

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Forwarding Status</h2>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isForwardingActive"
                        checked={!formData.isForwardingActive}
                        onChange={() => setFormData({ ...formData, isForwardingActive: false, forwardTo: '' })}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div className="flex items-center space-x-2">
                        <PhoneOff className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Forwarding Disabled</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="isForwardingActive"
                        checked={formData.isForwardingActive}
                        onChange={() => setFormData({ ...formData, isForwardingActive: true })}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <div className="flex items-center space-x-2">
                        <PhoneForwarded className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Forward All Calls</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className={`text-5xl ${formData.isForwardingActive ? 'text-green-600' : 'text-red-600'}`}>
                  {formData.isForwardingActive ? '→' : '✕'}
                </div>
              </div>
            </div>

            {formData.isForwardingActive && (
              <div className="space-y-2">
                <label htmlFor="forwardTo" className="text-sm font-medium text-gray-700">
                  Forward Calls To <span className="text-red-600">*</span>
                </label>
                <select
                  id="forwardTo"
                  value={formData.forwardTo}
                  onChange={(e) => setFormData({ ...formData, forwardTo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required={formData.isForwardingActive}
                >
                  <option value="">Select a number</option>
                  {forwardNumbers.map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">AI Assistant Configuration</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Configure how your AI assistant handles calls. The assistant will use this prompt to understand its role and how to interact with callers on your behalf.
                </p>
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
                    Assistant's Instructions
                  </label>
                  <textarea
                    id="prompt"
                    value={formData.prompt}
                    onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Example: I am a personal assistant. When callers ask for meetings, check my calendar and schedule them. For urgent matters, forward the call to my number. Always be professional and courteous."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Be specific about how you want the AI to handle different situations, schedule meetings, or when to forward calls.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="simProvider" className="text-sm font-medium text-gray-700">
                SIM Provider
              </label>
              <select
                id="simProvider"
                value={formData.simProvider}
                onChange={(e) => setFormData({ ...formData, simProvider: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select a provider</option>
                {simProviders.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;