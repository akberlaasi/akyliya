import ServiceForm from '@/components/forms/ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Service</h1>
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <ServiceForm />
      </div>
    </div>
  );
}
