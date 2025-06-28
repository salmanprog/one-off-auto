import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetch } from "../../hooks/request";

const ApplicationSettings: React.FC = () => {
  const { data, loading: fetchLoading } = useFetch("get_application_setting");
  const { postData } = useFetch("update_application_setting", "submit");
  const [loading, setLoading] = useState(false); // to manage form submission loading state
  const [formData, setFormData] = useState<any>({
    logo: null,
    favIcon: null,
    footerLogo: null,
    facebookLink: '',
    instagramLink: '',
    youtubeLink: '',
    email: '',
    phoneNumber: '',
    officeAddress: '',
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        logo: data.logo || null,
        favIcon: data.favicon || null,
        footerLogo: data.footer_logo || null,
        facebookLink: data.fb_link || '',
        instagramLink: data.insta_link || '',
        youtubeLink: data.youtube_link || '',
        email: data.email || '',
        phoneNumber: data.phone_number || '',
        officeAddress: data.office_address || '',
      });
    }
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let validationErrors: any = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[0-9\s\-\+]{7,15}$/; // Simple phone validation
    
    if (!formData.email || !emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (formData.facebookLink && !/^https?:\/\/.*\..*/.test(formData.facebookLink)) {
      validationErrors.facebookLink = "Please enter a valid URL for Facebook.";
    }

    if (formData.instagramLink && !/^https?:\/\/.*\..*/.test(formData.instagramLink)) {
      validationErrors.instagramLink = "Please enter a valid URL for Instagram.";
    }

    if (formData.youtubeLink && !/^https?:\/\/.*\..*/.test(formData.youtubeLink)) {
      validationErrors.youtubeLink = "Please enter a valid URL for YouTube.";
    }

    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Please enter a valid phone number.";
    }

    if (!formData.officeAddress) {
      validationErrors.officeAddress = "Office address is required.";
    }

    setErrors(validationErrors);

    // If no validation errors, return true to proceed with the form submission
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validate()) return;

    setLoading(true);

    const fd = new FormData();
    if (formData.logo) fd.append('logo', formData.logo);
    if (formData.favIcon) fd.append('favicon', formData.favIcon);
    if (formData.footerLogo) fd.append('footer_logo', formData.footerLogo);
    fd.append('fb_link', formData.facebookLink);
    fd.append('insta_link', formData.instagramLink);
    fd.append('youtube_link', formData.youtubeLink);
    fd.append('email', formData.email);
    fd.append('phone_number', formData.phoneNumber);
    fd.append('office_address', formData.officeAddress);

    try {
      const callback = (response: any) => {
        window.location.reload();
        setLoading(false);
      };
      await postData(fd, callback);
    } catch (error) {
      console.error("Error updating settings:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Application Settings</h2>

      {fetchLoading ? (
        <p>Loading account data...</p>
      ) : data ? (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Display Logo if exists */}
            <div className="grid grid-cols-4 items-start gap-4 mb-4">
              <Label className="text-right pt-2">Logo</Label>
              <div className="col-span-3 space-y-2">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="h-20 w-auto" />
                ) : (
                  <span>No logo uploaded</span> // Fallback if logo is not available
                )}
                <Input 
                  type="file" 
                  onChange={(e) => handleFileChange(e, 'logo')} 
                />
                {errors.logo && <span className="text-red-500">{errors.logo}</span>}
              </div>
            </div>

            {/* Display Favicon if exists */}
            <div className="grid grid-cols-4 items-start gap-4 mb-4">
              <Label className="text-right pt-2">Fav-icon</Label>
              <div className="col-span-3 space-y-2">
                {formData.favIcon ? (
                  <img src={formData.favIcon} alt="Favicon" className="h-10 w-auto" />
                ) : (
                  <span>No favicon uploaded</span> // Fallback if favicon is not available
                )}
                <Input 
                  type="file" 
                  onChange={(e) => handleFileChange(e, 'favIcon')} 
                />
                {errors.favIcon && <span className="text-red-500">{errors.favIcon}</span>}
              </div>
            </div>

            {/* Display Footer Logo if exists */}
            <div className="grid grid-cols-4 items-start gap-4 mb-4">
              <Label className="text-right pt-2">Footer Logo</Label>
              <div className="col-span-3 space-y-2">
                {formData.footerLogo ? (
                  <img src={formData.footerLogo} alt="Footer Logo" className="h-20 w-auto" />
                ) : (
                  <span>No footer logo uploaded</span> // Fallback if footer logo is not available
                )}
                <Input 
                  type="file" 
                  onChange={(e) => handleFileChange(e, 'footerLogo')} 
                />
                {errors.footerLogo && <span className="text-red-500">{errors.footerLogo}</span>}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="facebookLink" className="text-right">Facebook Link</Label>
              <Input
                id="facebookLink"
                name="facebookLink"
                className="col-span-3"
                value={formData.facebookLink}
                onChange={handleInputChange}
              />
              {errors.facebookLink && <span className="text-red-500">{errors.facebookLink}</span>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="instagramLink" className="text-right">Instagram Link</Label>
              <Input
                id="instagramLink"
                name="instagramLink"
                className="col-span-3"
                value={formData.instagramLink}
                onChange={handleInputChange}
              />
              {errors.instagramLink && <span className="text-red-500">{errors.instagramLink}</span>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="youtubeLink" className="text-right">YouTube Link</Label>
              <Input
                id="youtubeLink"
                name="youtubeLink"
                className="col-span-3"
                value={formData.youtubeLink}
                onChange={handleInputChange}
              />
              {errors.youtubeLink && <span className="text-red-500">{errors.youtubeLink}</span>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                className="col-span-3"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                className="col-span-3"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
            </div>

            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="officeAddress" className="text-right">Office Address</Label>
              <Input
                id="officeAddress"
                name="officeAddress"
                className="col-span-3"
                value={formData.officeAddress}
                onChange={handleInputChange}
              />
              {errors.officeAddress && <span className="text-red-500">{errors.officeAddress}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      ) : (
        <p>Unable to load account data.</p>
      )}
    </div>
  );
};

export default ApplicationSettings;
