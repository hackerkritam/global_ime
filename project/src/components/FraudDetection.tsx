import React, { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Clock, MapPin, CreditCard, Shield } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    amount: 25000,
    type: 'transfer',
    location: 'Kathmandu, Nepal',
    timestamp: '2024-03-20T10:30:00',
    risk: 'high',
    flags: ['Unusual amount', 'Different location', 'Multiple attempts']
  },
  {
    id: 2,
    amount: 1500,
    type: 'withdrawal',
    location: 'Dharan, Nepal',
    timestamp: '2024-03-20T11:15:00',
    risk: 'medium',
    flags: ['Frequent small transactions']
  },
  {
    id: 3,
    amount: 50000,
    type: 'transfer',
    location: 'Pokhara, Nepal',
    timestamp: '2024-03-20T12:00:00',
    risk: 'high',
    flags: ['International transaction', 'Large amount', 'New recipient']
  }
];

export default function FraudDetection() {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof mockTransactions[0] | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Fraud Detection System</h1>
        <p className="mt-2 text-gray-600">Real-time monitoring and analysis of suspicious transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Suspicious Transactions"
          value="15"
          change="+5"
          icon={<AlertTriangle className="h-6 w-6" />}
          type="warning"
        />
        <StatCard
          title="Average Response Time"
          value="45s"
          change="-10s"
          icon={<Clock className="h-6 w-6" />}
          type="success"
        />
        <StatCard
          title="Fraud Prevented"
          value="₹2.5M"
          change="+₹500K"
          icon={<Shield className="h-6 w-6" />}
          type="success"
        />
        <StatCard
          title="Active Monitoring"
          value="24/7"
          change="100%"
          icon={<CreditCard className="h-6 w-6" />}
          type="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Suspicious Transactions</h2>
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() => setSelectedTransaction(transaction)}
                    selected={selectedTransaction?.id === transaction.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedTransaction ? (
            <TransactionDetails transaction={selectedTransaction} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center text-gray-500">
              Select a transaction to view details
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskPatterns />
        <PreventiveMeasures />
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, type }: { 
  title: string, 
  value: string, 
  change: string, 
  icon: React.ReactNode,
  type: 'warning' | 'success' | 'info'
}) {
  const colors = {
    warning: 'text-yellow-600',
    success: 'text-green-600',
    info: 'text-blue-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className={colors[type]}>{icon}</div>
        <span className={`text-sm font-medium ${colors[type]}`}>
          {change}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mt-4">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}

function TransactionCard({ 
  transaction, 
  onClick, 
  selected 
}: { 
  transaction: typeof mockTransactions[0],
  onClick: () => void,
  selected: boolean
}) {
  const riskColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover: border-indigo-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">₹{transaction.amount.toLocaleString()}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${riskColors[transaction.risk as keyof typeof riskColors]}`}>
              {transaction.risk.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {transaction.location}
          </div>
        </div>
        <ArrowUpRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}

function TransactionDetails({ transaction }: { transaction: typeof mockTransactions[0] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Details</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Amount</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Type</h3>
          <p className="mt-1 text-gray-900 capitalize">{transaction.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Location</h3>
          <p className="mt-1 text-gray-900">{transaction.location}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
          <p className="mt-1 text-gray-900">
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Risk Flags</h3>
          <div className="mt-2 space-y-2">
            {transaction.flags.map((flag, index) => (
              <div key={index} className="flex items-center text-sm text-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {flag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskPatterns() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Identified Risk Patterns</h2>
      <div className="space-y-4">
        {[
          { pattern: 'Multiple transactions from different locations', risk: 'High', count: 12 },
          { pattern: 'Unusual transaction timing', risk: 'Medium', count: 8 },
          { pattern: 'Frequent small transfers', risk: 'Medium', count: 15 },
          { pattern: 'Large international transfers', risk: 'High', count: 5 }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{item.pattern}</p>
              <p className="text-sm text-gray-600 mt-1">Occurrences: {item.count}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              item.risk === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {item.risk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreventiveMeasures() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Preventive Measures</h2>
      <div className="space-y-4">
        {[
          {
            title: 'Two-Factor Authentication',
            description: 'Enabled for all high-risk transactions',
            status: 'Active'
          },
          {
            title: 'Location Monitoring',
            description: 'Track unusual transaction locations',
            status: 'Active'
          },
          {
            title: 'Amount Thresholds',
            description: 'Automatic flagging of large transactions',
            status: 'Active'
          },
          {
            title: 'Pattern Recognition',
            description: 'ML-based suspicious pattern detection',
            status: 'Active'
          }
        ].map((measure, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg">
            <Shield className="h-6 w-6 text-green-600 mr-4" />
            <div>
              <p className="font-medium text-gray-900">{measure.title}</p>
              <p className="text-sm text-gray-600">{measure.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}