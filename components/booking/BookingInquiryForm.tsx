'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type BookingFormData = {
  name: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  message: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const GUEST_KEYS = ['1', '2', '3', '4', '5plus'] as const;
const ROOM_KEYS = ['standard', 'deluxe', 'family', 'apartment'] as const;

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function FormField({ label, error, children }: FieldProps) {
  return (
    <div>
      <label className="mb-xs block font-body text-[0.8rem] font-medium uppercase tracking-[0.05em] text-charcoal/60">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-xs font-body text-[0.75rem] text-red-600">{error}</p>
      )}
    </div>
  );
}

export default function BookingInquiryForm() {
  const t = useTranslations('booking.form');
  const tGuests = useTranslations('booking.guestOptions');
  const tRooms = useTranslations('booking.roomOptions');
  const locale = useLocale();
  const submitRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      name: '',
      contact: '',
      checkIn: '',
      checkOut: '',
      guests: '',
      room: '',
      message: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setStatus('loading');
    trackEvent('form_submit');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      trackEvent('form_success');
      reset();
    } catch {
      setStatus('error');
      trackEvent('form_error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `booking-field-input ${hasError ? 'booking-field-input--error' : ''}`;

  return (
    <div className="h-full bg-white p-lg md:p-[3rem]">
      <h3 className="font-body text-h3 font-semibold text-charcoal">
        {t('heading')}
      </h3>
      <p className="mt-xs font-body text-body text-charcoal/60">
        {t('subheading')}
      </p>

      <div className="mt-lg space-y-md">
        <FormField label={t('name')} error={errors.name?.message}>
          <input
            {...register('name', { required: t('required') })}
            className={inputClass(!!errors.name)}
            autoComplete="name"
          />
        </FormField>

        <FormField label={t('contact')} error={errors.contact?.message}>
          <input
            {...register('contact', {
              required: t('required'),
              minLength: { value: 5, message: t('required') },
            })}
            className={inputClass(!!errors.contact)}
            autoComplete="tel email"
          />
        </FormField>

        <div className="grid gap-md sm:grid-cols-2">
          <FormField label={t('checkIn')}>
            <input
              {...register('checkIn')}
              type="date"
              className={inputClass(false)}
            />
          </FormField>
          <FormField label={t('checkOut')}>
            <input
              {...register('checkOut')}
              type="date"
              className={inputClass(false)}
            />
          </FormField>
        </div>

        <div className="grid gap-md sm:grid-cols-2">
          <FormField label={t('guests')}>
            <select {...register('guests')} className={inputClass(false)}>
              <option value="">{t('guestsPlaceholder')}</option>
              {GUEST_KEYS.map((key) => (
                <option key={key} value={key}>
                  {tGuests(key)}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label={t('room')}>
            <select {...register('room')} className={inputClass(false)}>
              <option value="">{t('roomPlaceholder')}</option>
              {ROOM_KEYS.map((key) => (
                <option key={key} value={key}>
                  {tRooms(key)}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label={t('message')}>
          <textarea
            {...register('message')}
            rows={4}
            placeholder={t('messagePlaceholder')}
            className={inputClass(false)}
          />
        </FormField>

        <button
          ref={submitRef}
          type="button"
          disabled={status === 'loading'}
          onClick={handleSubmit(onSubmit)}
          className="booking-submit-btn flex items-center justify-center gap-sm"
        >
          {status === 'loading' && (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}
          {status === 'success' && <Check className="h-5 w-5 text-green-700" />}
          {status === 'error' && (
            <AlertCircle className="h-5 w-5 text-red-700" />
          )}
          <span>
            {status === 'loading' && t('submitting')}
            {status === 'success' && t('success')}
            {status === 'error' && t('error')}
            {status === 'idle' && t('submit')}
          </span>
        </button>

        <p className="text-center font-body text-[0.75rem] text-charcoal/40">
          {t('privacy')}
        </p>
      </div>
    </div>
  );
}