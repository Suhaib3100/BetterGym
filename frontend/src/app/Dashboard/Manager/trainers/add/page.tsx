"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AddTrainerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience_years: "",
    status: "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.phone.length < 10) {
      toast.error("Phone number must be at least 10 digits");
      return false;
    }
    if (formData.specialization.length < 2) {
      toast.error("Please enter a specialization");
      return false;
    }
    if (!formData.experience_years || parseInt(formData.experience_years) < 0) {
      toast.error("Please enter valid years of experience");
      return false;
    }
    return true;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Sending request to backend...");
      
      const response = await fetch("http://localhost:3001/api/manager/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          experience_years: parseInt(formData.experience_years),
        }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Error response:", errorData);
        throw new Error(errorData?.message || "Failed to add trainer");
      }

      const data = await response.json();
      console.log("Success response:", data);

      toast.success("Trainer added successfully");
      router.push("/Dashboard/Manager/trainers");
      router.refresh();
    } catch (error) {
      console.error("Error adding trainer:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add trainer");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/Dashboard/Manager/trainers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trainers
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Trainer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter trainer name"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Enter specialization"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="experience_years" className="block text-sm font-medium mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience_years"
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    placeholder="Enter years of experience"
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/Dashboard/Manager/trainers")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Trainer..." : "Add Trainer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 