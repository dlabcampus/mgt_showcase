import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StudentVideoPage from "./student-video-page";
import { getStudentBySlug, students } from "./student-videos";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return students.map((student) => ({
    slug: student.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  return {
    title: student
      ? `${student.displayName} 프로젝트 기록 | MGTLAB`
      : "MGTLAB 프로젝트 기록",
    description: "MGTLAB 프로젝트 소개 영상을 확인하는 보호자 전용 페이지입니다.",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const student = getStudentBySlug(slug);

  if (!student) {
    notFound();
  }

  return <StudentVideoPage student={student} />;
}
