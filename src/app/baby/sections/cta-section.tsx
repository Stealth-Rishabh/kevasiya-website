"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Mail, Gift, Users } from "lucide-react";

export function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-[#3A5A40] to-[#334d38]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Journey of Love and Wonder
          </h2>
          <p className="text-xl text-[#e3e7e3] leading-relaxed">
            Be part of our story as we prepare to welcome our little miracle.
            Share in our excitement, get updates on our journey, and help us
            celebrate this incredible chapter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-6">
              Stay Connected With Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-[#e3e7e3]">
                <Mail className="w-5 h-5 mr-3" />
                <span>Get weekly updates on our baby journey</span>
              </div>
              <div className="flex items-center text-[#e3e7e3]">
                <Gift className="w-5 h-5 mr-3" />
                <span>Exclusive access to our registry updates</span>
              </div>
              <div className="flex items-center text-[#e3e7e3]">
                <Users className="w-5 h-5 mr-3" />
                <span>Invitations to special celebrations</span>
              </div>
              <div className="flex items-center text-[#e3e7e3]">
                <Heart className="w-5 h-5 mr-3" />
                <span>Share in our precious moments</span>
              </div>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-[#3A5A40] text-center">
                Let&apos;s Stay in Touch
              </CardTitle>
              <CardDescription className="text-center text-[#AE8F65]">
                We&apos;d love to share this beautiful journey with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-[#e8dcc8] focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-[#e8dcc8] focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone (Optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-[#e8dcc8] focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Share your excitement or any special message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-[#e8dcc8] focus:border-[#3A5A40] focus:ring-[#3A5A40] min-h-[100px]"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#3A5A40] hover:bg-[#334d38] text-white py-3 rounded-full text-lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Join Our Journey
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
