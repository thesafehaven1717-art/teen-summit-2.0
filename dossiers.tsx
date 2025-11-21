import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DossierCardSkeleton } from "@/components/skeletons/content-card-skeleton";
import { Download, FileText } from "lucide-react";
import type { Dossier } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

export default function DossiersPage() {
  const { data: dossiers, isLoading } = useQuery<Dossier[]>({
    queryKey: ["/api/dossiers"],
  });

  const handleDownload = async (dossier: Dossier) => {
    await queryClient.fetchQuery({
      queryKey: [`/api/dossiers/${dossier.id}/download`],
      queryFn: async () => {
        const res = await fetch(`/api/dossiers/${dossier.id}/download`, {
          method: "POST",
        });
        return res.json();
      },
    });
    window.open(dossier.fileUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Research Dossiers
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive research materials and debate topics for Teen Summit participants.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <DossierCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-page-title">
              Research Dossiers
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive research materials and debate topics for Teen Summit participants. Download and study these resources to prepare for your debates.
            </p>
          </div>

          {!dossiers || dossiers.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No dossiers available yet.</p>
                  <p className="text-sm mt-2">Check back soon for research materials!</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dossiers.map((dossier) => (
                <Card key={dossier.id} className="flex flex-col hover-elevate" data-testid={`card-dossier-${dossier.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs" data-testid={`badge-topic-${dossier.id}`}>
                        {dossier.topic}
                      </Badge>
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl" data-testid={`text-title-${dossier.id}`}>
                      {dossier.title}
                    </CardTitle>
                    {dossier.description && (
                      <CardDescription data-testid={`text-description-${dossier.id}`}>
                        {dossier.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-sm text-muted-foreground space-y-1">
                      {dossier.fileSize && (
                        <p data-testid={`text-filesize-${dossier.id}`}>
                          Size: {(dossier.fileSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                      {dossier.downloads > 0 && (
                        <p data-testid={`text-downloads-${dossier.id}`}>
                          Downloads: {dossier.downloads}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleDownload(dossier)}
                      data-testid={`button-download-${dossier.id}`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
