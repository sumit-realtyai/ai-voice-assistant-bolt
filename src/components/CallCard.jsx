import React, { useState } from 'react';
import {
  Phone,
  User,
  Calendar,
  Clock,
  Mail,
  Volume2,
  Forward,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatDuration } from '../utils/formatters';

export function CallCard({ call }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Call Details</h1>
          </div>
          <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
            {call.spam ? (
              <div className="flex items-center text-red-200">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">Spam Call</span>
              </div>
            ) : (
              <div className="flex items-center text-green-200">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm sm:text-base">Legitimate Call</span>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white hover:bg-indigo-500 p-2 rounded-full transition-colors"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content (Always Visible) */}
      <div className="p-4 sm:p-6 border-b">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-gray-500">Caller</p>
              <p className="font-medium truncate">{call.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{formatDuration(parseFloat(call.callDuration))} minutes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-gray-500">Started At</p>
              <p className="font-medium truncate">{call.startedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Caller Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Customer Number</p>
                  <p className="font-medium truncate">{call.customerNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium truncate">{call.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Forward className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Forward From</p>
                  <p className="font-medium truncate">{call.forwardFrom}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">To Number</p>
                  <p className="font-medium truncate">{call.toNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Call Summary</h3>
            <p className="text-gray-600 text-sm sm:text-base">{call.summary}</p>
          </div>

          {/* Transcript */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Transcript</h3>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono bg-white p-4 rounded-lg border overflow-x-auto">
              {call.transcript}
            </pre>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Started At</p>
                <p className="font-medium truncate">{call.startedAt}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Ended At</p>
                <p className="font-medium truncate">{call.endedAt}</p>
              </div>
            </div>
          </div>

          {/* Voice Recording */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Volume2 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Voice Recording</h3>
            </div>
            <div className="w-full">
              <audio controls className="w-full max-w-full">
                <source src={call.voiceUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}