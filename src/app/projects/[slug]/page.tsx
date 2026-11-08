import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject, projects } from "@/lib/projects";

export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.name} | Ayman Nasir` : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-32 sm:px-6">
      <Link
        href="/#projects"
        className={`${buttonVariants({ variant: "ghost" })} mb-6 -ml-3`}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to projects
      </Link>

      <h1 className="text-3xl font-bold sm:text-4xl">{project.name}</h1>
      <p className="mt-2 text-muted-foreground">{project.summary}</p>

      <div className="relative mt-6 aspect-video overflow-hidden rounded-xl border">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants()}
        >
          <ExternalLink className="mr-2 size-4" />
          Live project
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          <Code className="mr-2 size-4" />
          GitHub (client)
        </a>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">Main technology stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold">About the project</h2>
        <p className="leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Challenges faced</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {project.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Future plans</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {project.improvements.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
