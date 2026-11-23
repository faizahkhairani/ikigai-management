import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { IDENTIFIER_LABEL, normalizeIdentifier } from '@/lib/customer';
import { ORDER_LIMITS } from '@/features/order/schemas';
import { useCustomerActions } from '../hooks/useCustomerActions';
import { ADDRESS_MAX, customerSchema, type CustomerFormValues } from '../schemas';
import type { Customer } from '../types';

type FormProps = {
  customer: Customer;
  onDone: () => void;
};

const EditCustomerForm = ({ customer, onDone }: FormProps) => {
  const { update } = useCustomerActions();

  const defaultValues: CustomerFormValues = {
    name: customer.name ?? '',
    identifier: customer.identifier ?? '',
    phone: customer.phone ?? '',
    address: customer.address ?? '',
  };

  const form = useForm({
    defaultValues,
    validators: { onSubmit: customerSchema },
    onSubmit: async ({ value }) => {
      try {
        await update.mutateAsync({
          id: customer.id,
          payload: {
            name: value.name.trim(),
            identifier: normalizeIdentifier(value.identifier),
            phone: value.phone.trim(),
            address: value.address.trim(),
          },
        });
        toast.add({ type: 'success', description: 'Data customer diperbarui.' });
        onDone();
      } catch (err: any) {
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal menyimpan data customer',
          priority: 'high',
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nama lengkap (opsional)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  maxLength={ORDER_LIMITS.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="identifier">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{IDENTIFIER_LABEL}</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="adhya0160"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Error "isi salah satu" menempel di identifier. Validasi ulang saat no WA diubah, supaya
            error-nya hilang dan tidak memblokir submit berikutnya. */}
        <form.Field
          name="phone"
          listeners={{ onChange: () => void form.validateField('identifier', 'change') }}
        >
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>No WA</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  inputMode="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Identifier dan no WA dipakai untuk mengenali customer yang order ulang. Isi
                  minimal salah satu; yang sudah dipakai customer lain akan ditolak.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="address">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Alamat</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  maxLength={ADDRESS_MAX}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};

type Props = {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditCustomerDialog = ({ customer, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogDescription>Perubahan juga tampil di semua order customer ini.</DialogDescription>
      </DialogHeader>

      {/* key = id customer, biar isian terisi ulang kalau pindah ke customer lain */}
      {customer && (
        <EditCustomerForm key={customer.id} customer={customer} onDone={() => onOpenChange(false)} />
      )}
    </DialogContent>
  </Dialog>
);

export default EditCustomerDialog;