import type { Testimonial } from "../types";
import { Button } from "../../../../components/ui/button";
import { Skeleton } from "../../../../components/ui/skeleton";

type Props = {
  testimonials: Testimonial[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  loading?: boolean; // 👈 add this so parent can control loading state
};

export const TestimonialTable = ({
  testimonials,
  onDelete,
  onEdit,
  loading = false,
}: Props) => {
  if (loading) {
    return (
      <div>
        {/* Desktop skeleton */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Image</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Title</th>
                <th className="p-4 border-b">Description</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="p-4 border-b">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </td>
                  <td className="p-4 border-b">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4 border-b">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="p-4 border-b">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="p-4 border-b">
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile skeleton */}
        <div className="grid gap-4 md:hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-md space-y-3"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex justify-end space-x-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return <p>No testimonials found.</p>;
  }

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border-b">Image</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Title</th>
              <th className="p-4 border-b">Description</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">
                  {t.prof_pic || t.image ? (
                    <img
                      src={
                        typeof t.image === "string"
                          ? t.image
                          : t.prof_pic
                          ? t.prof_pic
                          : t.image
                          ? URL.createObjectURL(t.image as File)
                          : ""
                      }
                      alt={t.teachers_name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                  )}
                </td>
                <td className="p-4 border-b font-medium">{t.teachers_name}</td>
                <td className="p-4 border-b">{t.tittle}</td>
                <td className="p-4 border-b">{t.description}</td>
                <td className="p-4 border-b space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(t.id!)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(t.id!)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded-xl shadow-md space-y-3"
          >
            <div className="flex items-center space-x-4">
              {t.prof_pic || t.image ? (
                <img
                  src={
                    typeof t.image === "string"
                      ? t.image
                      : t.prof_pic
                      ? t.prof_pic
                      : t.image
                      ? URL.createObjectURL(t.image as File)
                      : ""
                  }
                  alt={t.teachers_name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-200" />
              )}
              <div>
                <p className="font-medium">{t.teachers_name}</p>
                <p className="text-sm text-gray-600">{t.tittle}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{t.description}</p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(t.id!)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(t.id!)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
