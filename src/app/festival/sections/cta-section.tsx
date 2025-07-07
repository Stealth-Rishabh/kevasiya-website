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
            Make Every Celebration Unforgettable
          </h2>
          <p className="text-xl text-[#e3e7e3] leading-relaxed">
            Join our community to get exclusive offers, gift ideas, and updates
            on our latest festival collections. Let's make every occasion
            special together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-6">
              Get the Best Festive Offers
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-[#e3e7e3]">
                <Mail className="w-5 h-5 mr-3" />
                <span>Get weekly updates on new arrivals</span>
              </div>
              <div className="flex items-center text-[#e3e7e3]">
                <Gift className="w-5 h-5 mr-3" />
                <span>Exclusive access to our festival collections</span>
              </div>
              <div className="flex items-center text-[#e3e7e3]">
                <Users className="w-5 h-5 mr-3" />
                <span>Invitations to special sale events</span>
              </div>
              <div className="flex items-center text-[#e3e7e3]">
                <Heart className="w-5 h-5 mr-3" />
                <span>Share the joy with our community</span>
              </div>
            </div>
          </div>

          <Card
            className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl"
            id="book"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-[#3A5A40] text-center">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-center text-[#AE8F65]">
                We&apos;d love to help you find the perfect gift
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
                    placeholder="Share your requirements or any special message..."
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
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
