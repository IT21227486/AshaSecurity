import { useMemo, useState, useEffect, useRef } from "react";
import { Field } from "./Field.jsx";
import { Input } from "./Input.jsx";
import PhoneInput from "./PhoneInput.jsx";
import { Select } from "./Select.jsx";
import FileUpload from "./FileUpload.jsx";

const titleOptions = [
  { label: "", value: "" },
  { label: "Mr.", value: "Mr" },
  { label: "Mrs.", value: "Mrs" },
  { label: "Ms.", value: "Ms" },
  { label: "Miss.", value: "Miss" },
  { label: "Rev.", value: "Rev" },
  { label: "Prof.", value: "Prof" },
  { label: "Ven.", value: "Ven" },
  { label: "Dr.", value: "Dr" },
];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-zinc-200">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-[28px] border border-zinc-800/80 bg-zinc-950/40 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle, right, center }) {
  return (
    <div
      className={[
        "flex flex-col gap-3 border-b border-white/10 px-6 py-5 md:flex-row md:items-center md:justify-between",
        center ? "md:justify-center md:text-center" : "",
      ].join(" ")}
    >
      <div className={center ? "w-full" : ""}>
        <div className="text-sm font-semibold tracking-wide text-zinc-100">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-1 text-xs text-zinc-400">{subtitle}</div>
        ) : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}

function SectionTitle({ children, hint }) {
  return (
    <div className="mt-8 first:mt-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold tracking-[0.14em] text-zinc-200">
          {children}
        </div>
        {hint ? <div className="text-xs text-zinc-400">{hint}</div> : null}
      </div>
      <div className="mt-3 h-px bg-white/10" />
    </div>
  );
}

function Grid({ children, cols = "md:grid-cols-2 xl:grid-cols-4" }) {
  return (
    <div className={`mt-4 grid grid-cols-1 gap-4 ${cols}`}>{children}</div>
  );
}

function ToggleRow({ label, checked, onChange, disabled, helper }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/30 p-4">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-white/80"
          checked={!!checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className="min-w-0">
          <div className="text-sm font-medium text-zinc-200">{label}</div>
          {helper ? (
            <div className="mt-1 text-xs text-zinc-400">{helper}</div>
          ) : null}
        </div>
      </label>
    </div>
  );
}

function RadioLikeCheck({ label, checked, onChange, disabled }) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-200">
      <input
        type="checkbox"
        className="h-4 w-4 accent-white/80"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span>{label}</span>
    </label>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      {title ? (
        <div className="text-xs font-semibold tracking-wide text-zinc-200">
          {title}
        </div>
      ) : null}
      <div className={title ? "mt-3 text-xs text-zinc-300" : "text-xs text-zinc-300"}>
        {children}
      </div>
    </div>
  );
}

function get(obj, path) {
  const parts = String(path || "").split(".");
  let cur = obj;
  for (const p of parts) {
    if (!cur) return undefined;
    cur = cur[p];
  }
  return cur;
}

/**
 * Person block variations used by the FI Client Registration (matches doc layout)
 */
function PersonBlockPrincipal({ basePath, data, update, busy }) {
  return (
    <Card className="mt-4">
      <CardHeader
        title="Principal Applicant"
        // right={<Pill>Required</Pill>}
        // subtitle="Fill all applicable fields. Leave blank if not relevant."
      />
      <div className="px-6 py-6">
        <Grid>
          <Field label="Title">
            <Select
                    path={`${basePath}.title`}
              value={data?.title || ""}
              onChange={(e) => update(`${basePath}.title`, e.target.value)}
              disabled={busy}
            >
              {titleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Initials">
            <Input
                    path={`${basePath}.initials`}
              value={data?.initials || ""}
              onChange={(e) => update(`${basePath}.initials`, e.target.value)}
              placeholder="Initials"
              disabled={busy}
            />
          </Field>

          <Field label="Names Denoted By Initials">
            <Input
                    path={`${basePath}.namesByInitials`}
              value={data?.namesByInitials || ""}
              onChange={(e) => update(`${basePath}.namesByInitials`, e.target.value)}
              placeholder="Names Denoted By Initials"
              disabled={busy}
            />
          </Field>

          <Field label="Surname">
            <Input
                    path={`${basePath}.surname`}
              value={data?.surname || ""}
              onChange={(e) => update(`${basePath}.surname`, e.target.value)}
              placeholder="Surname"
              disabled={busy}
            />
          </Field>
        </Grid>

        <Grid cols="md:grid-cols-2">
          <Field label="Telephone (Home)">
            <PhoneInput
                    path={`${basePath}.telHome`}
  value={data?.telHome || ""}
  onChange={(v) => update(`${basePath}.telHome`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Telephone (Office)">
            <PhoneInput
                    path={`${basePath}.telOffice`}
  value={data?.telOffice || ""}
  onChange={(v) => update(`${basePath}.telOffice`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Mobile No.">
            <PhoneInput
                    path={`${basePath}.mobile`}
  value={data?.mobile || ""}
  onChange={(v) => update(`${basePath}.mobile`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Email">
            <Input
                    path={`${basePath}.email`}
              type="email"
              value={data?.email || ""}
              onChange={(e) => update(`${basePath}.email`, e.target.value)}
              placeholder="Enter Email"
              disabled={busy}
            />
          </Field>

          <Field label="Permanent Address">
            <Input
                    path={`${basePath}.permanentAddress`}
              value={data?.permanentAddress || ""}
              onChange={(e) => update(`${basePath}.permanentAddress`, e.target.value)}
              placeholder="Enter Address"
              disabled={busy}
            />
          </Field>

          <Field label="Correspondence Address">
            <Input
                    path={`${basePath}.correspondenceAddress`}
              value={data?.correspondenceAddress || ""}
              onChange={(e) => update(`${basePath}.correspondenceAddress`, e.target.value)}
              placeholder="Enter Address"
              disabled={busy}
            />
          </Field>

          <Field label="Passport Number">
            <Input
                    path={`${basePath}.passportNo`}
              value={data?.passportNo || ""}
              onChange={(e) => update(`${basePath}.passportNo`, e.target.value)}
              placeholder="Enter Passport Number"
              disabled={busy}
            />
          </Field>

          <Field label="Nationality">
            <Input
                    path={`${basePath}.nationality`}
              value={data?.nationality || ""}
              onChange={(e) => update(`${basePath}.nationality`, e.target.value)}
              placeholder="Enter Nationality"
              disabled={busy}
            />
          </Field>

          <Field label="Passport Date of Issue">
            <Input path={`${basePath}.passportIssueDate`}
              type="date"
              value={data?.passportIssueDate || ""}
              onChange={(e) => update(`${basePath}.passportIssueDate`, clampYear4(e.target.value))}
              disabled={busy}
            />
          </Field>

          <Field label="Passport Date of Expiry">
            <Input path={`${basePath}.passportExpiryDate`}
              type="date"
              value={data?.passportExpiryDate || ""}
              onChange={(e) => update(`${basePath}.passportExpiryDate`, clampYear4(e.target.value))}
              disabled={busy}
            />
          </Field>

          <Field label="CDS A/C No">
            <div className="grid grid-cols-[64px_1fr] gap-2">
              <Input value={data?.cdsPrefix || "MSB"} disabled />
              <Input
                    path={`${basePath}.cdsNo`}
                value={data?.cdsNo || ""}
                onChange={(e) => update(`${basePath}.cdsNo`, e.target.value)}
                placeholder="Enter CDS A/C No"
                disabled={busy}
              />
            </div>
          </Field>

          <Field label="Occupation">
            <Input
                    path={`${basePath}.occupation`}
              value={data?.occupation || ""}
              onChange={(e) => update(`${basePath}.occupation`, e.target.value)}
              placeholder="Enter Occupation"
              disabled={busy}
            />
          </Field>

          <Field label="Employee Address">
            <Input
                    path={`${basePath}.employeeAddress`}
              value={data?.employeeAddress || ""}
              onChange={(e) => update(`${basePath}.employeeAddress`, e.target.value)}
              placeholder="Enter Employee Address"
              disabled={busy}
            />
          </Field>

          <Field label="Contact No.">
            <PhoneInput
                    path={`${basePath}.contactNo`}
  value={data?.contactNo || ""}
  onChange={(v) => update(`${basePath}.contactNo`, v)}
  defaultCode="+94"
/>
</Field>
        </Grid>

        <InfoBox title="Bank (IIA) Account Details">
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="">
              <Input
                    path={`${basePath}.bankIIA.bankName`}
                value={data?.bankIIA?.bankName || ""}
                onChange={(e) => update(`${basePath}.bankIIA.bankName`, e.target.value)}
                placeholder="Enter Bank Name"
                disabled={busy}
              />
            </Field>
            <Field label="">
              <Input
                    path={`${basePath}.bankIIA.branchName`}
                value={data?.bankIIA?.branchName || ""}
                onChange={(e) => update(`${basePath}.bankIIA.branchName`, e.target.value)}
                placeholder="Enter Branch Name"
                disabled={busy}
              />
            </Field>
            <Field label="">
              <Input
                    path={`${basePath}.bankIIA.type`}
                value={data?.bankIIA?.type || ""}
                onChange={(e) => update(`${basePath}.bankIIA.type`, e.target.value)}
                placeholder="Enter Type"
                disabled={busy}
              />
            </Field>
            <Field label="">
              <Input
                    path={`${basePath}.bankIIA.accountNo`}
                value={data?.bankIIA?.accountNo || ""}
                onChange={(e) => update(`${basePath}.bankIIA.accountNo`, e.target.value)}
                placeholder="Enter A/C No"
                disabled={busy}
              />
            </Field>
          </div>
        </InfoBox>
      </div>
    </Card>
  );
}

function PersonBlockJointSimple({ title, badge, basePath, data, update, busy }) {
  return (
    <Card className="mt-4">
      <CardHeader
        title={title}
        right={badge ? <Pill>{badge}</Pill> : null}
        // subtitle="Only applicable for joint applications."
      />
      <div className="px-6 py-6">
        <Grid>
          <Field label="Title">
            <Select
                    path={`${basePath}.title`}
              value={data?.title || ""}
              onChange={(e) => update(`${basePath}.title`, e.target.value)}
              disabled={busy}
            >
              {titleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Initials">
            <Input
                    path={`${basePath}.initials`}
              value={data?.initials || ""}
              onChange={(e) => update(`${basePath}.initials`, e.target.value)}
              placeholder="Initials"
              disabled={busy}
            />
          </Field>

          <Field label="Names Denoted By Initials">
            <Input
                    path={`${basePath}.namesByInitials`}
              value={data?.namesByInitials || ""}
              onChange={(e) => update(`${basePath}.namesByInitials`, e.target.value)}
              placeholder="Names Denoted By Initials"
              disabled={busy}
            />
          </Field>

          <Field label="Surnames">
            <Input
                    path={`${basePath}.surname`}
              value={data?.surname || ""}
              onChange={(e) => update(`${basePath}.surname`, e.target.value)}
              placeholder="Surnames"
              disabled={busy}
            />
          </Field>
        </Grid>

        <Grid cols="md:grid-cols-2">
          <Field label="Telephone (Home)">
            <PhoneInput
                    path={`${basePath}.telHome`}
  value={data?.telHome || ""}
  onChange={(v) => update(`${basePath}.telHome`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Telephone (Office)">
            <PhoneInput
                    path={`${basePath}.telOffice`}
  value={data?.telOffice || ""}
  onChange={(v) => update(`${basePath}.telOffice`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Mobile No.">
            <PhoneInput
                    path={`${basePath}.mobile`}
  value={data?.mobile || ""}
  onChange={(v) => update(`${basePath}.mobile`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Email">
            <Input
                    path={`${basePath}.email`}
              value={data?.email || ""}
              onChange={(e) => update(`${basePath}.email`, e.target.value)}
              placeholder="Enter Email"
              disabled={busy}
            />
          </Field>

          <Field label="Permanent Address">
            <Input
                    path={`${basePath}.permanentAddress`}
              value={data?.permanentAddress || ""}
              onChange={(e) => update(`${basePath}.permanentAddress`, e.target.value)}
              placeholder="Enter Address"
              disabled={busy}
            />
          </Field>

          <Field label="Correspondence Address">
            <Input
                    path={`${basePath}.correspondenceAddress`}
              value={data?.correspondenceAddress || ""}
              onChange={(e) => update(`${basePath}.correspondenceAddress`, e.target.value)}
              placeholder="Enter Address"
              disabled={busy}
            />
          </Field>

          <Field label="Passport Number">
            <Input
                    path={`${basePath}.passportNo`}
              value={data?.passportNo || ""}
              onChange={(e) => update(`${basePath}.passportNo`, e.target.value)}
              placeholder="Enter Passport Number"
              disabled={busy}
            />
          </Field>

          <Field label="Nationality">
            <Input
                    path={`${basePath}.nationality`}
              value={data?.nationality || ""}
              onChange={(e) => update(`${basePath}.nationality`, e.target.value)}
              placeholder="Enter Nationality"
              disabled={busy}
            />
          </Field>

          <Field label="CDS A/C No">
            <div className="grid grid-cols-[64px_1fr] gap-2">
              <Input value={data?.cdsPrefix || "MSB"} disabled />
              <Input
                    path={`${basePath}.cdsNo`}
                value={data?.cdsNo || ""}
                onChange={(e) => update(`${basePath}.cdsNo`, e.target.value)}
                placeholder="Enter CDS A/C No"
                disabled={busy}
              />
            </div>
          </Field>
        </Grid>
      </div>
    </Card>
  );
}

function PersonBlockSecondJoint({ basePath, data, update, busy }) {
  return (
    <Card className="mt-4">
      <CardHeader
        title="In Case of 2nd Joint Applicant (Only Applicable for Joint Applications.)"
        // right={<Pill>Optional</Pill>}
        // subtitle="Only applicable for joint applications."
      />
      <div className="px-6 py-6">
        <Grid>
          <Field label="Title">
            <Select
                    path={`${basePath}.title`}
              value={data?.title || ""}
              onChange={(e) => update(`${basePath}.title`, e.target.value)}
              disabled={busy}
            >
              {titleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Initials">
            <Input
                    path={`${basePath}.initials`}
              value={data?.initials || ""}
              onChange={(e) => update(`${basePath}.initials`, e.target.value)}
              placeholder="Initials"
              disabled={busy}
            />
          </Field>

          <Field label="Names Denoted By Initials">
            <Input
                    path={`${basePath}.namesByInitials`}
              value={data?.namesByInitials || ""}
              onChange={(e) => update(`${basePath}.namesByInitials`, e.target.value)}
              placeholder="Names Denoted By Initials"
              disabled={busy}
            />
          </Field>

          <Field label="Surnames">
            <Input
                    path={`${basePath}.surname`}
              value={data?.surname || ""}
              onChange={(e) => update(`${basePath}.surname`, e.target.value)}
              placeholder="Surnames"
              disabled={busy}
            />
          </Field>
        </Grid>

        <Grid cols="md:grid-cols-2">
          <Field label="Res. Address">
            <Input
                    path={`${basePath}.resAddress`}
              value={data?.resAddress || ""}
              onChange={(e) => update(`${basePath}.resAddress`, e.target.value)}
              placeholder="Enter Res Address"
              disabled={busy}
            />
          </Field>

          <Field label="Office Address">
            <Input
                    path={`${basePath}.officeAddress`}
              value={data?.officeAddress || ""}
              onChange={(e) => update(`${basePath}.officeAddress`, e.target.value)}
              placeholder="Enter Office Address"
              disabled={busy}
            />
          </Field>

          <Field label="Passport Number">
            <Input
                    path={`${basePath}.passportNo`}
              value={data?.passportNo || ""}
              onChange={(e) => update(`${basePath}.passportNo`, e.target.value)}
              placeholder="Enter Passport Number"
              disabled={busy}
            />
          </Field>

          <Field label="Passport Date of Issue">
            <Input path={`${basePath}.passportIssueDate`}
              type="date"
              value={data?.passportIssueDate || ""}
              onChange={(e) => update(`${basePath}.passportIssueDate`, clampYear4(e.target.value))}
              disabled={busy}
            />
          </Field>

          <Field label="Occupation">
            <Input
                    path={`${basePath}.occupation`}
              value={data?.occupation || ""}
              onChange={(e) => update(`${basePath}.occupation`, e.target.value)}
              placeholder="Enter Occupation"
              disabled={busy}
            />
          </Field>

          <Field label="Nationality">
            <Input
                    path={`${basePath}.nationality`}
              value={data?.nationality || ""}
              onChange={(e) => update(`${basePath}.nationality`, e.target.value)}
              placeholder="Enter Nationality"
              disabled={busy}
            />
          </Field>

          <Field label="Telephone (Home)">
            <PhoneInput
                    path={`${basePath}.telHome`}
  value={data?.telHome || ""}
  onChange={(v) => update(`${basePath}.telHome`, v)}
  defaultCode="+94"
/>
</Field>

          <Field label="Telephone (Office)">
            <PhoneInput
                    path={`${basePath}.telOffice`}
  value={data?.telOffice || ""}
  onChange={(v) => update(`${basePath}.telOffice`, v)}
  defaultCode="+94"
/>
</Field>
        
<Field label="Mobile No.">
  <PhoneInput
                    path={`${basePath}.mobile`}
    value={data?.mobile || ""}
    onChange={(v) => update(`${basePath}.mobile`, v)}
    defaultCode="+94"
/>
</Field>

<Field label="Contact No.">
  <PhoneInput
                    path={`${basePath}.contactNo`}
    value={data?.contactNo || ""}
    onChange={(v) => update(`${basePath}.contactNo`, v)}
    defaultCode="+94"
/>
</Field>
</Grid>
      </div>
    </Card>
  );
}

function SignatureRow({
  busy,
  label1,
  file1,
  setFile1,
  label2,
  file2,
  setFile2,
  label3,
  file3,
  setFile3,
  path1,
  path2,
  path3,
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <FileUpload label={label1} accept="image/*,.pdf" file={file1} setFile={setFile1} path={path1} disabled={busy} />
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <FileUpload label={label2} accept="image/*,.pdf" file={file2} setFile={setFile2} path={path2} disabled={busy} />
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <FileUpload label={label3} accept="image/*,.pdf" file={file3} setFile={setFile3} path={path3} disabled={busy} />
      </div>
    </div>
  );
}


// Allow manual typing in date inputs. Clamp year to 4 digits.
// Supports both ISO (YYYY-MM-DD) and DD/MM/YYYY
const clampYear4 = (value) => {
  if (!value) return value;
  const s = String(value);
  if (s.includes("/")) {
    const parts = s.split("/");
    if (parts[2]) parts[2] = parts[2].slice(0, 4);
    return parts.join("/").slice(0, 10);
  }
  const parts = s.split("-");
  if (parts[0]) parts[0] = parts[0].slice(0, 4);
  return parts.join("-").slice(0, 10);
};

export default function ForeignIndividualClientRegistration({
  form,
  update,
  busy,

  // already in your current version
  bankProof,
  setBankProof,

  // NEW (optional) — to match the document structure fully
  principalSignature,
  setPrincipalSignature,
  jointSignature,
  setJointSignature,
  secondJointSignature,
  setSecondJointSignature,
  clientsSignature,
  setClientsSignature,
}) {
  const data = form?.fiClientRegistration || {};

  const principal = data.principal || {};
  const joint = data.jointApplicant || {};
  const second = data.secondJointApplicant || {};

  const localBank = data.localBankContact || {};
  const investment = data.investmentDecision || {};
  const cdsInst = data.jointCdsInstructions || {};
  // --------------------------------------------------
  // Auto-fill Joint CDS Account Instruction holder names
  // based on "Names Denoted By Initials"
  // - Principal Holder  <- Principal Applicant initials
  // - First Joint Holder <- Joint 1 initials (if enabled)
  // - Second Joint Holder <- Joint 2 initials (if enabled)
  // We avoid overwriting user edits by only auto-filling when:
  //   - the target field is empty, OR
  //   - the target field still equals the last auto-filled value.
  // --------------------------------------------------
  const lastAutoCdsHoldersRef = useRef({
    principalHolder: "",
    firstJointHolder: "",
    secondJointHolder: "",
  });

  useEffect(() => {
    const desiredPrincipal = (principal?.namesByInitials || "").trim();
    const desiredFirst = (joint?.enabled ? joint?.namesByInitials : "").trim();
    const desiredSecond = (second?.enabled ? second?.namesByInitials : "").trim();

    const currentPrincipal = (cdsInst?.principalHolder || "");
    const currentFirst = (cdsInst?.firstJointHolder || "");
    const currentSecond = (cdsInst?.secondJointHolder || "");

    const last = lastAutoCdsHoldersRef.current;

    if (desiredPrincipal && (currentPrincipal === "" || currentPrincipal === last.principalHolder)) {
      update("fiClientRegistration.jointCdsInstructions.principalHolder", desiredPrincipal);
    }

    if (desiredFirst && (currentFirst === "" || currentFirst === last.firstJointHolder)) {
      update("fiClientRegistration.jointCdsInstructions.firstJointHolder", desiredFirst);
    } else if (!desiredFirst && currentFirst === last.firstJointHolder) {
      // If Joint 1 gets disabled, clear only if it was auto-filled before
      update("fiClientRegistration.jointCdsInstructions.firstJointHolder", "");
    }

    if (desiredSecond && (currentSecond === "" || currentSecond === last.secondJointHolder)) {
      update("fiClientRegistration.jointCdsInstructions.secondJointHolder", desiredSecond);
    } else if (!desiredSecond && currentSecond === last.secondJointHolder) {
      // If Joint 2 gets disabled, clear only if it was auto-filled before
      update("fiClientRegistration.jointCdsInstructions.secondJointHolder", "");
    }

    lastAutoCdsHoldersRef.current = {
      principalHolder: desiredPrincipal,
      firstJointHolder: desiredFirst,
      secondJointHolder: desiredSecond,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    principal?.namesByInitials,
    joint?.enabled,
    joint?.namesByInitials,
    second?.enabled,
    second?.namesByInitials,
  ]);

  const staff = data.staffDeclaration || {};
  const instr = data.instructionAuthorization || {};
  const office = data.officeUseOnly || {};
  const decl = data.iWeDeclaration || {};
  const cert = data.certifyingOfficer || {};
  // ============================
  // Auto-sync initials -> CDS instruction holder names
  // - Joint Holder/s  : joint1Initials / joint2Initials
  // - Principal Holder: principalInitials
  // Keeps syncing if the field still matches the last auto-filled value.
  // If user manually edits the target field, we stop overwriting it.
  // ============================
  const principalInitials = (principal?.namesByInitials || "").trim();
  const joint1Initials = (joint?.namesByInitials || "").trim();
  const joint2Initials = (second?.namesByInitials || "").trim();

  const autoJointHolders = [joint1Initials, joint2Initials].filter(Boolean).join(" / ");
  const autoPrincipalHolder = principalInitials;

  const lastAutoJointRef = useRef("");
  const lastAutoPrincipalRef = useRef("");

  useEffect(() => {
    const current = (cdsInst?.authorizeJointName || "").trim();
    const canOverwrite = !current || current === lastAutoJointRef.current;

    if (autoJointHolders && canOverwrite) {
      update("fiClientRegistration.jointCdsInstructions.authorizeJointName", autoJointHolders);
      lastAutoJointRef.current = autoJointHolders;
      return;
    }

    // Track last auto even if field is empty so future edits can overwrite correctly.
    if (autoJointHolders) lastAutoJointRef.current = autoJointHolders;
  }, [autoJointHolders]);

  useEffect(() => {
    const current = (cdsInst?.paymentsToName || "").trim();
    const canOverwrite = !current || current === lastAutoPrincipalRef.current;

    if (autoPrincipalHolder && canOverwrite) {
      update("fiClientRegistration.jointCdsInstructions.paymentsToName", autoPrincipalHolder);
      lastAutoPrincipalRef.current = autoPrincipalHolder;
      return;
    }

    if (autoPrincipalHolder) lastAutoPrincipalRef.current = autoPrincipalHolder;
  }, [autoPrincipalHolder]);

  // -------------------------------------------------
  // Auto-fill: I/WE DECLARATION from Principal Applicant
  // - Name            <- principal.initials
  // - Passport Number <- principal.passportNo
  // - CDS A/C No      <- principal.cdsNo (prefix stays MSB)
  // - Address         <- principal.permanentAddress
  // Keeps syncing while the declaration fields are empty OR still equal to the last auto-filled value.
  // If the user manually edits any declaration field, it stops overwriting that field.
  // -------------------------------------------------
  
  // -------------------------------------------------
  // Auto-sync (LIVE) Principal Applicant -> I/We Declaration
  // Always keeps the Declaration fields updated when Principal values change.
  // -------------------------------------------------
  useEffect(() => {
    const setIfDifferent = (path, nextValue) => {
      const v = String(nextValue ?? "").trim();
      const cur = String(get(form, path) ?? "").trim();
      if (v !== cur) update(path, v);
    };

    // Pull latest values directly from form state (more reliable across re-renders/step changes)
    const pNames = String(
      get(form, "fiClientRegistration.principal.namesByInitials") ??
        get(form, "fiClientRegistration.principal.initials") ??
        ""
    ).trim();

    const pPassport = String(
      get(form, "fiClientRegistration.principal.passportNo") ?? ""
    ).trim();

    const pCdsNo = String(
      get(form, "fiClientRegistration.principal.cdsNo") ?? ""
    ).trim();

    const pAddress = String(
      get(form, "fiClientRegistration.principal.permanentAddress") ?? ""
    ).trim();

    // I/We -> auto-sync from Principal Applicant
    setIfDifferent("fiClientRegistration.iWeDeclaration.name", pNames);
    setIfDifferent("fiClientRegistration.iWeDeclaration.passportNo", pPassport);
    setIfDifferent("fiClientRegistration.iWeDeclaration.cdsNo", pCdsNo);
    setIfDifferent("fiClientRegistration.iWeDeclaration.address", pAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

const anyJointEnabled = !!joint.enabled || !!second.enabled;

  // Safe local fallbacks if parent didn’t pass signature state props
  const [pSigLocal, setPSigLocal] = useState(null);
  const [jSigLocal, setJSigLocal] = useState(null);
  const [sSigLocal, setSSigLocal] = useState(null);
  const [cSigLocal, setCSigLocal] = useState(null);

  const pSig = principalSignature ?? pSigLocal;
  const setPSig = setPrincipalSignature ?? setPSigLocal;

  const jSig = jointSignature ?? jSigLocal;
  const setJSig = setJointSignature ?? setJSigLocal;

  const sSig = secondJointSignature ?? sSigLocal;
  const setSSig = setSecondJointSignature ?? setSSigLocal;

  const cSig = clientsSignature ?? cSigLocal;
  const setCSig = setClientsSignature ?? setCSigLocal;

  const headerRight = useMemo(() => {
    return (
      <>
        <Pill>Foreign</Pill>
        <Pill>Individual</Pill>
        {anyJointEnabled ? <Pill>Joint</Pill> : <Pill>Single</Pill>}
      </>
    );
  }, [anyJointEnabled]);

  return (
    <div className="space-y-8">
      <Card><center>
        <CardHeader
          title="CLIENT REGISTRATION FORM"
          // subtitle="Foreign Individual — Please complete all relevant sections."
          // right={headerRight}
          center
        /></center>

        <div className="px-6 py-6">
          {/* PRINCIPAL */}
          <SectionTitle>PRINCIPAL APPLICANT</SectionTitle>
          <PersonBlockPrincipal
            basePath="fiClientRegistration.principal"
            data={principal}
            update={update}
            busy={busy}
          />

          {/* CONTACT DETAILS OF THE LOCAL BANK */}
          <SectionTitle>CONTACT DETAILS OF THE LOCAL BANK</SectionTitle>
          <Card className="mt-4">
            <CardHeader title="Local Bank Contact" 
            // right={<Pill>Details</Pill>} 
            />
            <div className="px-6 py-6">
              <Grid cols="md:grid-cols-3">
                <Field label="">
                  <Input
                    path={"fiClientRegistration.localBankContact.bankName"}
                    value={localBank.bankName || ""}
                    onChange={(e) => update("fiClientRegistration.localBankContact.bankName", e.target.value)}
                    placeholder="Enter Bank Name"
                    disabled={busy}
                  />
                </Field>
                <Field label="">
                  <Input
                    path={"fiClientRegistration.localBankContact.contactPerson"}
                    value={localBank.contactPerson || ""}
                    onChange={(e) => update("fiClientRegistration.localBankContact.contactPerson", e.target.value)}
                    placeholder="Enter Contact Person"
                    disabled={busy}
                  />
                </Field>
                <Field label="">
                  <PhoneInput
                    path={"fiClientRegistration.localBankContact.contactPhone"} value={localBank.contactPhone || ""} onChange={(v) => update("fiClientRegistration.localBankContact.contactPhone", v)} />
                </Field>
              </Grid>
            </div>
          </Card>

          {/* STOCK MARKET EXPERIENCE + PRESENT BROKER */}
          <SectionTitle>STOCK MARKET EXPERIENCE</SectionTitle>
          <Card className="mt-4">
            <CardHeader title="Experience" 
            // right={<Pill>Optional</Pill>} 
            />
            <div className="px-6 py-6">
              <Grid cols="md:grid-cols-2">
                <Field label="">
                  <Input
                    path={"fiClientRegistration.stockMarketExperience"}
                    value={data.stockMarketExperience || ""}
                    onChange={(e) => update("fiClientRegistration.stockMarketExperience", e.target.value)}
                    placeholder="Enter Experience"
                    disabled={busy}
                  />
                </Field>

                <Field label="Present Broker (s) if any">
                  <Input
                    path={"fiClientRegistration.presentBroker"}
                    value={data.presentBroker || ""}
                    onChange={(e) => update("fiClientRegistration.presentBroker", e.target.value)}
                    placeholder="Name"
                    disabled={busy}
                  />
                </Field>
              </Grid>
            </div>
          </Card>

          {/* INVESTMENT DECISION */}
          <SectionTitle>INVESTMENT DECISIONS ARE TO BE</SectionTitle>
          <Card className="mt-4">
            <CardHeader title="Investment Decision" 
            // right={<Pill>Tick</Pill>} 
             />
            <div className="px-6 py-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <RadioLikeCheck
                  label="Discretionary"
                  checked={!!investment.discretionary}
                  onChange={(v) => update("fiClientRegistration.investmentDecision.discretionary", v)}
                  disabled={busy}
                />
                <RadioLikeCheck
                  label="If so please fill form of Discretionary"
                  checked={!!investment.discretionaryFormFilled}
                  onChange={(v) => update("fiClientRegistration.investmentDecision.discretionaryFormFilled", v)}
                  disabled={busy}
                />
                <RadioLikeCheck
                  label="Non Discretionary"
                  checked={!!investment.nonDiscretionary}
                  onChange={(v) => update("fiClientRegistration.investmentDecision.nonDiscretionary", v)}
                  disabled={busy}
                />
              </div>

              <InfoBox>
                A discretionary account is a CDS account that allows the investment advisor to buy and sell securities without the client’s consent for each trade.
                The client must sign a discretionary disclosure with the broker clearly stating the investment objectives of the client as documentation of the client’s consent.
              </InfoBox>
            </div>
          </Card>

          {/* JOINT APPLICANTS */}
          <SectionTitle hint="Enable only if applicable">JOINT APPLICANTS</SectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ToggleRow
              label="Enable Joint Applicant"
              checked={!!joint.enabled}
              onChange={(v) => update("fiClientRegistration.jointApplicant.enabled", v)}
              disabled={busy}
              helper="Tick this if there is a first joint holder."
            />
            <ToggleRow
              label="Enable 2nd Joint Applicant"
              checked={!!second.enabled}
              onChange={(v) => update("fiClientRegistration.secondJointApplicant.enabled", v)}
              disabled={busy}
              helper="Only applicable for joint applications with a second joint holder."
            />
          </div>

          {joint.enabled ? (
            <PersonBlockJointSimple
              title="Joint Applicant (Only applicable for joint applications.)"
              // badge="Optional"
              basePath="fiClientRegistration.jointApplicant"
              data={joint}
              update={update}
              busy={busy}
            />
          ) : null}

          {second.enabled ? (
            <PersonBlockSecondJoint
              basePath="fiClientRegistration.secondJointApplicant"
              data={second}
              update={update}
              busy={busy}
            />
          ) : null}

          {/* JOINT CDS ACCOUNT INSTRUCTIONS */}
          <SectionTitle>JOINT CDS ACCOUNT INSTRUCTIONS</SectionTitle>

          <Card className="mt-4">
            <CardHeader
              title="Reference to Section 1.1 (a) of the Client Agreement of Asha Securities Limited"
              // subtitle="Joint CDS Account Instructions"
              // right={<Pill>MSB Prefix</Pill>}
            />

            <div className="px-6 py-6">
              <Grid cols="md:grid-cols-2">
                <Field label="CDS A/C No">
                  <div className="grid grid-cols-[64px_1fr] gap-2">
                    <Input value={cdsInst.cdsPrefix || "MSB"} disabled />
                    <Input
                    path={"fiClientRegistration.jointCdsInstructions.cdsNo"}
                      value={cdsInst.cdsNo || ""}
                      onChange={(e) => update("fiClientRegistration.jointCdsInstructions.cdsNo", e.target.value)}
                      placeholder="Enter CDS A/C No"
                      disabled={busy}
                    />
                  </div>
                </Field>

                <Field label="Principal Holder">
                  <Input
                    path={"fiClientRegistration.jointCdsInstructions.principalHolder"}
                    value={cdsInst.principalHolder || ""}
                    onChange={(e) => update("fiClientRegistration.jointCdsInstructions.principalHolder", e.target.value)}
                    placeholder="Enter Principal Holder"
                    disabled={busy}
                  />
                </Field>

                <Field label="First Joint Holder (Only applicable for joint applications.)">
                  <Input
                    path={"fiClientRegistration.jointCdsInstructions.firstJointHolder"}
                    value={cdsInst.firstJointHolder || ""}
                    onChange={(e) => update("fiClientRegistration.jointCdsInstructions.firstJointHolder", e.target.value)}
                    placeholder="Enter First Joint Holder"
                    disabled={busy}
                  />
                </Field>

                <Field label="Second Joint Holder (Only applicable for joint applications.)">
                  <Input
                    path={"fiClientRegistration.jointCdsInstructions.secondJointHolder"}
                    value={cdsInst.secondJointHolder || ""}
                    onChange={(e) => update("fiClientRegistration.jointCdsInstructions.secondJointHolder", e.target.value)}
                    placeholder="Enter Second Joint Holder"
                    disabled={busy}
                  />
                </Field>

                <Field label="Date">
                  <Input path="fiClientRegistration.jointCdsInstructions.date"
                    type="date"
                    value={cdsInst.date || ""}
                    onChange={(e) => update("fiClientRegistration.jointCdsInstructions.date", clampYear4(e.target.value))}
                    disabled={busy}
                  />
                </Field>
              </Grid>

              <InfoBox title="Reference to Section 1.1 (a) of the Client Agreement of Asha Securities Limited, I authorize to give trading orders and settlement orders to Asha Securities Limited. I have no objection in Asha Securities Limited making payments to,">
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Enter Name of Joint Holder/s">
                    <Input path="fiClientRegistration.jointCdsInstructions.authorizeJointName"
                      value={cdsInst.authorizeJointName || ""}
                      onChange={(e) =>
                        update("fiClientRegistration.jointCdsInstructions.authorizeJointName", e.target.value)
                      }
                      placeholder="Enter Name of Joint Holder/s"
                      disabled={busy}
                    />
                  </Field>

                  <Field label="Enter Name of Principal Holder">
                    <Input
                    path={"fiClientRegistration.jointCdsInstructions.paymentsToName"}
                      value={cdsInst.paymentsToName || ""}
                      onChange={(e) => update("fiClientRegistration.jointCdsInstructions.paymentsToName", e.target.value)}
                      placeholder="Enter Name of Principal Holder"
                      disabled={busy}
                    />
                  </Field>
                </div>
              </InfoBox>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <FileUpload
                  label="Herewith attached the photocopy of bank proof for your reference."
                  accept="image/*,.pdf"
                  file={bankProof}
                  setFile={setBankProof}
                  path="bankProof"
                  disabled={busy}
                />
              </div>

              {/* SIGNATURE UPLOADS (3 columns like the document) */}
              <SignatureRow
                busy={busy}
                label1="Signature of Principal Applicant"
                file1={pSig}
                setFile1={setPSig}
                path1="principalSig"
                label2="Signature of Joint Applicant"
                file2={jSig}
                setFile2={setJSig}
                path2="jointSig"
                label3="Signature of 2nd Joint Applicant"
                file3={sSig}
                setFile3={setSSig}
                path3="secondJointSig"
              />

              {/* STAFF DECLARATION + CLIENT SIGNATURE + AUTHORIZATION */}
              <InfoBox title="Declaration by the staff">
                <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="">
                    <Input
                    path={"fiClientRegistration.staffDeclaration.staffName"}
                      value={staff.staffName || ""}
                      onChange={(e) => update("fiClientRegistration.staffDeclaration.staffName", e.target.value)}
                      placeholder="Enter Name"
                      disabled={busy}
                    />
                  </Field>
                  <div className="md:col-span-2 text-xs text-zinc-400">
                    ( Investment Adviso r) on behalf of the Asha Securities Ltd has clearly explained the Risk disclosure statement to the client while inviting the client
                    to read and ask questions and take independent advice if the client wishes
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <FileUpload
                      label="Clients Signature"
                      accept="image/*,.pdf"
                      file={cSig}
                      setFile={setCSig}
                      disabled={busy}
                    />
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <Field label="Name of Person/s Authorises to Give Instructions">
                      <Input path="fiClientRegistration.instructionAuthorization.authorisedNames"
                        value={instr.authorisedNames || ""}
                        onChange={(e) =>
                          update("fiClientRegistration.instructionAuthorization.authorisedNames", e.target.value)
                        }
                        placeholder="Enter Name"
                        disabled={busy}
                      />
                    </Field>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <Field label="NIC of Person/s Authorises to Give Instructions">
                      <Input path="fiClientRegistration.instructionAuthorization.authorisedNIC"
                        value={instr.authorisedNIC || ""}
                        onChange={(e) => {
                          const cleaned = String(e.target.value || "")
                            .replace(/[\s-]/g, "")
                            .toUpperCase();
                          update("fiClientRegistration.instructionAuthorization.authorisedNIC", cleaned);
                        }}
                        placeholder="Enter NIC No"
                        disabled={busy}
                      />
                    </Field>
                  </div>
                </div>
              </InfoBox>

              {/* OFFICE USE ONLY */}
              <SectionTitle>OFFICE USE ONLY</SectionTitle>
              <Card className="mt-4">
                <CardHeader title="Office Use Only" />
                <div className="px-6 py-6">
                  <Grid cols="md:grid-cols-3">
                    <Field label="Application received on">
                      <Input path="fiClientRegistration.officeUseOnly.receivedOn"
                        type="date"
                        value={office.receivedOn || ""}
                        onChange={(e) => update("fiClientRegistration.officeUseOnly.receivedOn", clampYear4(e.target.value))}
                        disabled={busy}
                      />
                    </Field>
                    <Field label="Advisor's Name">
                      <Input
                    path={"fiClientRegistration.officeUseOnly.advisorName"}
                        value={office.advisorName || ""}
                        onChange={(e) => update("fiClientRegistration.officeUseOnly.advisorName", e.target.value)}
                        placeholder="Enter Name"
                        disabled={busy}
                      />
                    </Field>
                    <Field label="Advisor's Signature">
                      <Input
                    path={"fiClientRegistration.officeUseOnly.advisorSignature"}
                        value={office.advisorSignature || ""}
                        onChange={(e) => update("fiClientRegistration.officeUseOnly.advisorSignature", e.target.value)}
                        placeholder="Signature"
                        disabled={busy}
                      />
                    </Field>
                  </Grid>
                </div>
              </Card>

              {/* I/WE DECLARATION */}
              <SectionTitle>I / WE DECLARATION</SectionTitle>
              <Card className="mt-4">
                <CardHeader title="Declaration" 
                // right={<Pill>Required</Pill>} 
                />
                <div className="px-6 py-6">
                  <Grid cols="md:grid-cols-2">
                    <span>I / We</span>
                    <Field label="Name">
                      <Input
                    path={"fiClientRegistration.iWeDeclaration.name"}
                        value={decl.name || ""}
                        onChange={(e) => update("fiClientRegistration.iWeDeclaration.name", e.target.value)}
                        placeholder="Enter Name"
                        disabled={busy}
                      />
                    </Field>
                    <Field label="Passport Number">
                      <Input
                    path={"fiClientRegistration.iWeDeclaration.passportNo"}
                        value={decl.passportNo || ""}
                        onChange={(e) => update("fiClientRegistration.iWeDeclaration.passportNo", e.target.value)}
                        placeholder="Enter Passport Number"
                        disabled={busy}
                      />
                    </Field>

                    <Field label="CDS A/C No">
                      <div className="grid grid-cols-[64px_1fr] gap-2">
                        <Input value={decl.cdsPrefix || "MSB"} disabled />
                        <Input path="fiClientRegistration.iWeDeclaration.cdsNo"
                          value={decl.cdsNo || ""}
                          onChange={(e) => update("fiClientRegistration.iWeDeclaration.cdsNo", (e.target.value || "").replace(/\D/g, ""))}
                          placeholder="Enter CDS A/C No"
                          disabled={busy}
                        />
                      </div>
                    </Field>

                    <Field label="Address">
                      <Input
                    path={"fiClientRegistration.iWeDeclaration.address"}
                        value={decl.address || ""}
                        onChange={(e) => update("fiClientRegistration.iWeDeclaration.address", e.target.value)}
                        placeholder="Enter Address"
                        disabled={busy}
                      />
                    </Field>
                  </Grid>

                  <InfoBox>
                    Here by declare that I / we are aware of particulars given below.
                    <div className="mt-3 space-y-2 text-xs text-zinc-400">
                      <div>
                        I / We undertake to operate my / our share trading account with ASHA SECURITIES LTD. ( Hereinafter referred to as BROKER ) in accordance with CSE Stock Broker Rule and other prevailing laws and regulations of Sri Lanka and in particular to the authority hereinafter granted by me / us to the Broker.
                      </div>
                      <div>
                        In the event of my / our failure to settle the amounts due in respect of a share purchase, I / we do hereby irrevocably authorize the Broker to sell such securities involved in the default and if such proceeds are inadequate to cover the shortfall and any loss incurred by the Broker, to sell any other security in my / our portfolio held by the Broker in the Central Depository Systems (Pvt) Ltd., so that the full amount due to the Broker may be settled and any surplus arising on the sale of shares shall accrue to the Broker unless such surplus arise from the sale of other quoted shares deposited by the buyer as collateral with broker in which event the surplus shall be remitted to after settlement day of the relevant sale (s).
                      </div>
                      <div>
                        The funds to be invested for the purchase of securities through the Securities Account to be opened with the CDS will not be funds derived from any money laundering activity or funds generated through financing of terrorist or any other illegal activity.
                      </div>
                      <div>
                        In the event of a variation of any information given in the CDS Form 1, Addendum to CDS Form 1 (A) this declaration and other information submitted by me / us along with the application to open a CDS Account, I / we undertake to inform the CDS in writing within fourteen (14) days of such variation.
                      </div>
                      <div>
                        Change of Broker Material Information ( Ownership / Address ) will be notified over public notice in printed Media.
                      </div>
                      <div>
                        The irrevocable authority granted hereby shall in no way effect or exempt me / us from any liability as stated herein towards the BROKER arising from or consequent upon any such default.
                      </div>
                      <div>
                        Also I / we do hereby irrevocably agree that in the event of any purchase orders placed with you for the purchase of shares, I / we shall pay approximately 50% of the value of such purchase by a legal tender which amount shall be set off against the total amount due from me / us to you on the due date of settlement in respect of such purchases, and the relevant investment advisors may be incentivized by the company on such purchase and sales turnovers.
                      </div>
                      <div>
                        Any delayed payments will be subject to additional interest cost on the consideration and will be debited to my / our account. Interest percentage will be decided by the Broker considering the prevailing interest rates. ( not exceeding a maximum interest rate of 0.1% per day )
                      </div>
                      <div>
                        The risk disclosure statement was explained while advising independently and was invited to read and ask questions.
                      </div>
                      <div>Services provided - Online Facility, Research Reports.</div>
                    </div>
                  </InfoBox>

                  {/* Final signatures + certifying officer */}
                  <SignatureRow
                    busy={busy}
                    label1="Signature of Principal Applicant"
                    file1={pSig}
                    setFile1={setPSig}
                    label2="Signature of Joint Applicant"
                    file2={jSig}
                    setFile2={setJSig}
                    label3="Signature of 2nd Joint Applicant"
                    file3={sSig}
                    setFile3={setSSig}
                  />

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Name of the Certifying Officer">
                      <Input
                    path={"fiClientRegistration.certifyingOfficer.name"}
                        value={cert.name || ""}
                        onChange={(e) => update("fiClientRegistration.certifyingOfficer.name", e.target.value)}
                        // disabled={true}
                      />
                    </Field>
                    <Field label="Signature of the Certifying Officer">
                      <Input
                    path={"fiClientRegistration.certifyingOfficer.signature"}
                        value={cert.signature || ""}
                        onChange={(e) => update("fiClientRegistration.certifyingOfficer.signature", e.target.value)}
                        // disabled={true}
                      />
                    </Field>
                    <Field label="Date">
                      <Input path="fiClientRegistration.certifyingOfficer.date"
                        type="date"
                        value={cert.date || ""}
                        onChange={(e) => update("fiClientRegistration.certifyingOfficer.date", clampYear4(e.target.value))}
                        // disabled={true}
                      />
                    </Field>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
