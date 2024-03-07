"use client";
import { trpc } from "@admin/hooks/trpc";
import { useQRCode } from "next-qrcode";
import React, { useState } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { Button } from "@ui/components/ui/button";
import { toast } from "sonner";

const TablePage = () => {
  const { data, isSuccess } = trpc.getTables.useQuery();
  const { Canvas } = useQRCode();
  const utils = trpc.useUtils();

  const exportImage = (id: string, number: number) => {
    html2canvas(document.getElementById(id)!).then((canvas) => {
      const url = canvas.toDataURL("image/png", 0.9);
      const urlObject = document.createElement("a");
      urlObject.href = url;
      urlObject.setAttribute("download", `table-${number}.png`);
      document.body.appendChild(urlObject);
      urlObject.click();
    });
  };
  const { mutate } = trpc.createTable.useMutation({
    onSuccess() {
      toast.success("Created new table");
      utils.getTables.invalidate();
    },
    onError() {
      toast.error("Failed to create table");
    },
  });
  const addTable = () => {
    mutate();
  };

  return (
    <div className="w-auto mx-14">
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Tables</div>
        <div className="flex flex-row items-center gap-x-4">
          <Button onClick={addTable}>Add Table</Button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {isSuccess &&
          data
            .sort((a, b) => a.number - b.number)
            .map(({ number, id }) => (
              <div
                key={id}
                className="m-2 p-4 rounded-xl bg-[#e1cdad] w-[332px]"
              >
                <div>
                  <div id={id}>
                    <Canvas
                      // TODO: FIXTHIS URL
                      text={`http://localhost:3002/${id}`}
                      options={{
                        margin: 2,
                        width: 300,
                        color: {
                          dark: "#000000",
                          light: "#e1cdad",
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between mx-4">
                    <div className="flex justify-between text-center text-2xl font-bold font-[Alata] pb-1">
                      <div>Joes Cafe</div>
                      <div>Table: {number}</div>
                    </div>
                    <Button
                      className="flex w-full"
                      onClick={() => exportImage(id, number)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TablePage;
